import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import { fetchMarkdownDetail } from "../services/api";

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
        return <div style={{ color: "red" }}>エラー: {error}</div>;
    }

    const html = marked.parse(content);

    return (
        <div>
            <h2>Detail: {slug}</h2>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

export default MarkdownDetail;
