// backend/tests/global.d.ts など
import { Mock } from 'jest-mock';
declare module '@aws-sdk/client-s3' {
    // @aws-sdk/client-s3 には本来ない mockSend を追加宣言する
    export const mockSend: Mock;
}
