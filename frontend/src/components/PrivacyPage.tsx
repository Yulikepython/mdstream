import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const PrivacyPage: React.FC = () => {
    const [content, setContent] = useState(""); // 状態は string

    useEffect(() => {
        (async () => {
            const text = await fetch("/markdown/privacy.md").then(res => res.text());
            const rawHtml = await marked.parse(text, { async: true }); // Promise<string>
            const safeHtml: string = DOMPurify.sanitize(rawHtml);
            setContent(safeHtml);
        })();
    }, []);

    return (
        <>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            </div>
        </>
    );
};

export default PrivacyPage;
