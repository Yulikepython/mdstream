// src/components/MarkdownDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import { fetchMarkdownDetail } from "../services/api";
import styles from "../styles/MarkdownDetail.module.scss";

const MarkdownDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;
        fetchMarkdownDetail(slug)
            .then((data) => setContent(data.content))
            .catch((err) => setError(err.message));
    }, [slug]);

    if (error) {
        return <div className={styles.errorMessage}>エラー: {error}</div>;
    }

    const html = marked.parse(content);

    return (
        <div className={styles.mdDetailContainer}>
            <h2>Detail: {slug}</h2>
            <div
                className={styles.mdContent}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};

export default MarkdownDetail;
