// TermsPage.tsx
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const TermsPage: React.FC = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        (async () => {
            const text: string = await fetch("/markdown/terms.md").then(res => res.text());
            const rawHtml: string = await marked.parse(text, { async: true }); // Promise<string>
            const safeHtml: string = DOMPurify.sanitize(rawHtml);
            setContent(safeHtml);
        })();
    }, []);

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default TermsPage;
