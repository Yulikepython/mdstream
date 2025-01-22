// __mocks__/@aws-sdk/client-s3.ts

// @ts-nocheck  ← ここでも型チェック無効化してOK
import { jest } from '@jest/globals';

// 何でも受け取れるモック
export const mockSend = jest.fn();

export class S3Client {
    constructor() {}
    send = mockSend;
}

export class ListObjectsV2Command {
    constructor(args) {}
}

export class GetObjectCommand {
    constructor(args) {}
}
