// tests/handler.test.ts

// @ts-nocheck  ← ★ これでこのファイル内の型チェックを無効化
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { Readable } from 'stream';
import { getMarkdownList, getMarkdownDetail } from '../src/handler';

// AWS SDK をモック化
jest.mock('@aws-sdk/client-s3');
// モックファイルの mockSend を取得
import { mockSend } from '@aws-sdk/client-s3';

/** テスト用のイベント生成関数 */
function createMockEvent(
    overrides: Partial<APIGatewayProxyEventV2> = {}
): APIGatewayProxyEventV2 {
    return {
        version: '2.0',
        routeKey: 'GET /test',
        rawPath: '/test',
        rawQueryString: '',
        requestContext: {
            accountId: 'test',
            apiId: 'test',
            domainName: 'localhost',
            domainPrefix: '',
            http: {
                method: 'GET',
                path: '/test',
                protocol: 'HTTP/1.1',
                sourceIp: '127.0.0.1',
                userAgent: 'jest',
            },
            requestId: 'test-request',
            routeKey: 'GET /test',
            stage: '$default',
            time: '2025-01-01T00:00:00Z',
            timeEpoch: 1735686000000,
        },
        isBase64Encoded: false,
        headers: {},
        pathParameters: {},
        ...overrides,
    };
}

describe('handler.ts', () => {
    beforeEach(() => {
        // テスト毎に環境変数を再設定
        process.env.BUCKET_NAME = 'test-bucket';
        process.env.S3_PREFIX = 'dev/';
        process.env.ALLOWED_REFERER = 'http://localhost:5173';
        process.env.AWS_REGION = 'ap-northeast-1';

        mockSend.mockReset();
    });

    // ---------------- getMarkdownList ----------------
    describe('getMarkdownList', () => {
        it('S3にある.mdファイルの一覧を返す', async () => {
            mockSend.mockResolvedValueOnce({
                Contents: [
                    { Key: 'dev/terms.md' },
                    { Key: 'dev/privacy.md' },
                    { Key: 'dev/other.txt' },
                ],
            });

            const event = createMockEvent({
                headers: { referer: 'http://localhost:5173' },
            });
            const result = await getMarkdownList(event);

            expect(result.statusCode).toBe(200);
            expect(result.headers?.['Content-Type']).toBe('application/json');

            const body = JSON.parse(result.body || '');
            expect(body).toEqual([
                { slug: 'dev/terms', title: 'dev/terms' },
                { slug: 'dev/privacy', title: 'dev/privacy' },
            ]);
        });

        it('不正リファラの場合は403を返す', async () => {
            const event = createMockEvent({
                headers: { referer: 'https://evil.com' },
            });
            const result = await getMarkdownList(event);
            expect(result.statusCode).toBe(403);
            expect(result.body).toBe('Forbidden');
        });

        it('S3エラーなら500を返す', async () => {
            mockSend.mockRejectedValueOnce(new Error('S3 error'));
            const event = createMockEvent({
                headers: { referer: 'http://localhost:5173' },
            });
            const result = await getMarkdownList(event);

            expect(result.statusCode).toBe(500);
            expect(result.body).toBe('Internal Server Error');
        });
    });

    // ---------------- getMarkdownDetail ----------------
    describe('getMarkdownDetail', () => {
        it('指定slugのMarkdown本文を取得', async () => {
            mockSend.mockResolvedValueOnce({
                Body: Readable.from(['# Terms of Service\n\nDetail...']),
            });

            const event = createMockEvent({
                headers: { referer: 'http://localhost:5173' },
                pathParameters: { slug: 'terms' },
            });
            const result = await getMarkdownDetail(event);

            expect(result.statusCode).toBe(200);
            const body = JSON.parse(result.body || '');
            expect(body).toEqual({
                slug: 'terms',
                content: '# Terms of Service\n\nDetail...',
            });
        });

        it('存在しないファイルなら404を返す', async () => {
            const notFoundError = new Error('Not Found');
            notFoundError.name = 'NoSuchKey';
            mockSend.mockRejectedValueOnce(notFoundError);

            const event = createMockEvent({
                headers: { referer: 'http://localhost:5173' },
                pathParameters: { slug: 'notfound' },
            });
            const result = await getMarkdownDetail(event);

            expect(result.statusCode).toBe(404);
            expect(result.body).toBe('Not Found');
        });

        it('不正リファラなら403を返す', async () => {
            const event = createMockEvent({
                headers: { referer: 'https://other.com' },
                pathParameters: { slug: 'terms' },
            });
            const result = await getMarkdownDetail(event);

            expect(result.statusCode).toBe(403);
            expect(result.body).toBe('Forbidden');
        });

        it('slugが指定されていない場合は400を返す', async () => {
            const event = createMockEvent({
                headers: { referer: 'http://localhost:5173' },
                pathParameters: {},
            });
            const result = await getMarkdownDetail(event);

            expect(result.statusCode).toBe(400);
            expect(result.body).toBe('Missing slug');
        });
    });
});
