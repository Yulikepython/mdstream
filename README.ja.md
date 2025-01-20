## 目次

1. [README（日本語版）](#readme日本語版)
2. [README (English Version)](#readme-english-version)
3. [ファイル保存例](#ファイル保存例)

---

## README（日本語版）

以下は `README.ja.md` などのファイル名で配置することを想定した例です。

```md
# mdstream (日本語版)

mdstream は、React (Vite) + TypeScript を使用したフロントエンドと、Serverless Framework (Node.js) を使用したバックエンドで構成されたサンプルプロジェクトです。MarkdownファイルをS3に保存し、それをWebアプリケーションで一覧・詳細表示する仕組みになっています。

## プロジェクト概要

- **フロントエンド**:  
  - `frontend/` ディレクトリ配下にあります。Vite をベースとしたReactアプリケーションです。
  - Markdownの読み込みやリスト表示、詳細表示の機能が含まれます。  
  - `terms.md`, `privacy.md` といったMarkdownファイルを `/public/markdown/` に配置しており、`TermsPage` および `PrivacyPage` コンポーネントで表示しています。

- **バックエンド**:
  - `backend/` ディレクトリ配下にあります。Serverless Framework を使用し、AWS Lambda 上で動作します。
  - S3 から Markdownファイルを取得し、API (HTTP) 経由でフロントエンドへ返すサンプルとなっています。

- **ライセンス**:  
  - 本プロジェクトは GNU General Public License (GPL) v3 で公開されています。詳細はリポジトリ直下の `LICENSE` をご覧ください。

---

## ディレクトリ構成

```bash
mdstream/
  ├─ frontend/           # React + Vite プロジェクト
  │   ├─ public/markdown # Markdownファイル
  │   ├─ src/            # ソースコード (コンポーネントなど)
  │   ├─ package.json
  │   ├─ vite.config.ts
  │   └─ ...(その他コンフィグ)
  ├─ backend/            # Serverless Framework (Node.js) プロジェクト
  │   ├─ src/
  │   ├─ serverless.yml
  │   └─ package.json
  ├─ LICENSE
  └─ README.md (あるいは README.ja.md)
```

---

## セットアップ・利用方法

### 1. リポジトリのクローン

```bash
git clone https://github.com/yourname/mdstream.git
cd mdstream
```

### 2. フロントエンドのセットアップ

```bash
cd frontend
npm install
```

- 開発サーバ起動 (ローカルAPI用)
  ```bash
  npm run dev:local
  ```
    - デフォルトでは [http://localhost:5173](http://localhost:5173) が開きます。
    - `.env.dev`（または同等の環境変数設定ファイル）が存在する場合は、それを読み込みます。
- ビルド
  ```bash
  npm run build:dev
  # or
  npm run build:prod
  ```
    - ビルド成果物は `frontend/dist/` に出力されます。

### 3. バックエンドのセットアップ

```bash
cd ../backend
npm install
```

- ローカル開発 (serverless-offline使用)
  ```bash
  npm run dev:local
  ```
    - `.env.local` や `.env.dev` などのファイルに `BUCKET_NAME` や `ALLOWED_REFERER` を設定し、S3バケットとの連携を模擬します。
    - Serverless Offline により、[http://localhost:3000](http://localhost:3000) などで API をテストできます。（`serverless.yml` の設定により変わります）

- デプロイ例 (開発環境)
  ```bash
  npm run deploy:dev
  ```
    - AWS Lambda にデプロイされます。実際に利用するにはAWSアカウントの設定・認証が必要です。

---

## Markdownファイルの追加・編集

- フロントエンドの `/public/markdown/` ディレクトリ内に、`.md` ファイルを追加すると、`PrivacyPage.tsx` や `TermsPage.tsx` で直接参照できます。
- バックエンド側で Markdown を管理する場合は、AWS S3 にファイルをアップロードし、`serverless.yml` や環境変数 (`S3_PREFIX` など) を通して連携します。
    - その場合、`fetchMarkdownList` / `fetchMarkdownDetail` 関数が参照する API が S3 から直接読み込みます。

---

## カスタマイズ方法

1. **デザイン・スタイルの修正**
    - `frontend/src/styles/` 配下の `.scss` や `.css` を編集してUIを変更できます。
2. **コンポーネントの追加**
    - `frontend/src/components/` に新規コンポーネントを追加し、必要に応じてルーティング (`App.tsx`) を編集します。
3. **API エンドポイントの変更**
    - `backend/src/handler.ts` 内でロジックを追加・修正します。
    - `serverless.yml` でAPIパスやAWSの設定を変更できます。
4. **ライブラリの追加**
    - フロントエンドの場合 `frontend/package.json`、バックエンドの場合 `backend/package.json` に依存を追加し、必要に応じて `npm install` を実行してください。

---

## 貢献方法 (Contributing)

- バグ報告や機能要望はIssueを立ててください。
- プルリクエストを歓迎します。大きな変更の場合は事前にIssueで議論しましょう。

---

## ライセンス

- このプロジェクトは GNU GPL v3 ライセンスの下で公開されています。
- 詳細は [LICENSE](./LICENSE) ファイルをご確認ください。

---

## 問い合わせ

- 質問や不具合に関しては、Issueまたは [info@itc.tokyo](mailto:info@itc.tokyo) までご連絡ください。