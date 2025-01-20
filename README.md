# mdstream (English)

mdstream is a sample project consisting of a **React (Vite) + TypeScript** frontend and a **Serverless Framework (Node.js)** backend. It uses AWS S3 to store Markdown files and fetches them via HTTP APIs for listing and detail views in the web application.


## Link
[日本語版はこちら](./README.ja.md)

## Overview

- **Frontend**:
    - Located under the `frontend/` directory, built with Vite + React + TypeScript.
    - Displays a list of Markdown files and their contents.
    - Also demonstrates how to load local markdown (e.g., `terms.md` and `privacy.md`) in the `/public/markdown/` folder and render it with React.

- **Backend**:
    - Located under the `backend/` directory, built with the Serverless Framework on Node.js.
    - Fetches Markdown files from an S3 bucket and serves them via an HTTP API.
    - The environment variables (`BUCKET_NAME`, `ALLOWED_REFERER`, etc.) control where the Markdown files are stored and which referers are allowed.

- **License**:
    - This project is published under **GNU General Public License (GPL) v3**.
    - See the `LICENSE` file for more details.

---

## Directory Structure

```bash
mdstream/
  ├─ frontend/           # React + Vite project
  │   ├─ public/markdown # Markdown files
  │   ├─ src/            # Source code (components, services, etc.)
  │   ├─ package.json
  │   ├─ vite.config.ts
  │   └─ ...other configs
  ├─ backend/            # Serverless Framework (Node.js) project
  │   ├─ src/
  │   ├─ serverless.yml
  │   └─ package.json
  ├─ LICENSE
  └─ README.md (or README.ja.md for Japanese)
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/mdstream.git
cd mdstream
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

- **Local Development** (connecting to a local API):
  ```bash
  npm run dev:local
  ```
    - By default, the local dev server runs at [http://localhost:5173](http://localhost:5173).
    - It will load environment variables from `.env.dev` (or any `.env.*` specified).
- **Build**
  ```bash
  npm run build:dev
  # or
  npm run build:prod
  ```
    - The build output goes to `frontend/dist/`.

### 3. Backend Setup

```bash
cd ../backend
npm install
```

- **Local Development (serverless-offline)**:
  ```bash
  npm run dev:local
  ```
    - This will read environment variables such as `BUCKET_NAME` and `ALLOWED_REFERER` from `.env.dev` or similar.
    - The local serverless-offline endpoint (e.g., http://localhost:3000) will serve the API (depending on your `serverless.yml` config).
- **Deploy to AWS Example**:
  ```bash
  npm run deploy:dev
  ```
    - Requires your AWS credentials to be configured.
    - Deploys the backend as AWS Lambda functions.

---

## Editing / Adding Markdown Files

- **Local** (frontend-based):
    - Simply place new `.md` files under `frontend/public/markdown/`.
    - Import or fetch them in your React components (like `PrivacyPage.tsx` or `TermsPage.tsx`).
- **Backend (S3-based)**:
    - Upload your `.md` files to the appropriate S3 bucket.
    - Update environment variables (`S3_PREFIX`, etc.) to point to the correct location.
    - The `fetchMarkdownList` and `fetchMarkdownDetail` functions in `frontend/src/services/api.ts` call the API endpoints that read from S3.

---

## Customization

1. **Styling**:
    - Edit SCSS/CSS files in `frontend/src/styles/` to change the UI appearance.
2. **Add Components**:
    - Create new React components in `frontend/src/components/`, and add corresponding routes in `App.tsx` as needed.
3. **API Changes**:
    - Modify logic in `backend/src/handler.ts` or the `serverless.yml` file to adjust endpoints, environment variables, AWS settings, etc.
4. **Dependencies**:
    - Update `frontend/package.json` or `backend/package.json` for any additional libraries.
    - Run `npm install` to install new dependencies.

---

## Contributing

- Please open an Issue for bugs or feature requests.
- Pull requests are welcome. For major changes, consider discussing them in an Issue first.

---

## License

- Released under the **GNU GPL v3** license.
- Refer to [LICENSE](./LICENSE) for details.

---

## Contact

- For questions or issues, please open an Issue or email [info@itc.tokyo](mailto:info@itc.tokyo).