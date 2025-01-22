// src/components/MarkdownDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { fetchMarkdownDetail } from "../services/api";
import styles from "../styles/MarkdownDetail.module.scss";

const MarkdownDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState("");  // 生のMarkdownテキスト
    const [html, setHtml] = useState("");       // サニタイズ済みのHTML
    const [error, setError] = useState("");

    // 1) slug が変わったら Markdown 詳細を fetch
    useEffect(() => {
        if (!slug) return;
        fetchMarkdownDetail(slug)
            .then((data) => setContent(data.content)) // Markdownテキストをセット
            .catch((err) => setError(err.message));
    }, [slug]);

    // 2) content が更新されるたびに parse + sanitize して html に反映
    useEffect(() => {
        if (!content) return;
        const rawHtml = marked.parse(content, { async: false });
        const safeHtml = DOMPurify.sanitize(rawHtml);
        setHtml(safeHtml);
    }, [content]);

    // 3) エラー時の表示
    if (error) {
        return <div className={styles.errorMessage}>エラー: {error}</div>;
    }

    // 4) サニタイズ済みHTMLを表示
    return (
        <div className={styles.mdDetailContainer}>
            {/* --- パンくず: "List > {slug}" --- */}
            <nav style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                <Link to="/" style={{ marginRight: "0.5rem", color: "#007bff" }}>
                    /
                </Link>
                {" > "}
                <span style={{ marginLeft: "0.5rem" }}>{slug}</span>
            </nav>
            <h2>Detail: {slug}</h2>
            <div
                className={styles.mdContent}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};

export default MarkdownDetail;
