import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const bucketName = process.env.BUCKET_NAME!;
const s3Prefix = process.env.S3_PREFIX!;         // ← dev/ or prod/
const allowedReferers = process.env.ALLOWED_REFERER!;  // ← カンマ区切り文字列
const s3Client = new S3Client({ region: process.env.AWS_REGION || "ap-northeast-1" });

// 複数リファラ対応（カンマ区切り）
function isAllowedReferer(referer: string): boolean {
    if (!referer) return false;
    // 例: "localhost:5173, dev.mydomain.com" → ["localhost:5173", "dev.mydomain.com"]
    const arr = allowedReferers.split(",");
    return arr.some(allow => referer.includes(allow.trim()));
}

// S3オブジェクト本文を文字列で取得
async function getObjectBody(key: string): Promise<string> {
    const cmd = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const data = await s3Client.send(cmd);
    const stream = data.Body as Readable;
    let body = "";
    for await (const chunk of stream) {
        body += chunk;
    }
    return body;
}

// 1) 一覧取得
export async function getMarkdownList(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const referer = event.headers.referer || "";

    // リファラに allowedReferers のいずれかが含まれていない場合は403
    if (!isAllowedReferer(referer)) {
        return { statusCode: 403, body: "Forbidden" };
    }

    try {
        // Prefix に dev/ or prod/ を付与
        const listCmd = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: s3Prefix,
        });
        const result = await s3Client.send(listCmd);

        const files = (result.Contents || [])
            .filter(obj => obj.Key?.endsWith(".md"))
            .map(obj => {
                // "dev/getting-started.md" → slug: "getting-started"
                // 1) prefixを除去
                const key = obj.Key!;
                const relativeKey = key.replace(s3Prefix, "");  // "getting-started.md"
                const fileName = relativeKey.replace(".md", "");
                return {
                    slug: fileName,
                    title: fileName,
                };
            });

        return {
            statusCode: 200,
            body: JSON.stringify(files),
            headers: { "Content-Type": "application/json" },
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Internal Server Error" };
    }
}

// 2) 詳細取得
export async function getMarkdownDetail(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const referer = event.headers.referer || "";
    if (!isAllowedReferer(referer)) {
        return { statusCode: 403, body: "Forbidden" };
    }

    const slug = event.pathParameters?.slug;
    if (!slug) {
        return { statusCode: 400, body: "Missing slug" };
    }

    try {
        // key = "dev/{slug}.md" or "prod/{slug}.md"
        const key = `${s3Prefix}${slug}.md`;
        const content = await getObjectBody(key);

        return {
            statusCode: 200,
            body: JSON.stringify({ slug, content }),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // or "http://localhost:5173"
            },
        };
    } catch (err: any) {
        console.error(err);
        if (err.name === "NoSuchKey") {
            return { statusCode: 404, body: "Not Found" };
        }
        return { statusCode: 500, body: "Internal Server Error" };
    }
}
