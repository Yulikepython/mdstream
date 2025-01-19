import React, { useEffect, useState } from "react";
import { fetchMarkdownList } from "../services/api";

interface MarkdownFile {
    slug: string;
    title: string;
}

const MarkdownList: React.FC = () => {
    const [items, setItems] = useState<MarkdownFile[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMarkdownList()
            .then((data) => setItems(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <div style={{ color: "red" }}>エラー: {error}</div>;
    }

    return (
        <div>
            <h2>Markdown List</h2>
            <ul>
                {items.map((md) => (
                    <li key={md.slug}>
                        <a href={`/detail/${md.slug}`}>{md.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MarkdownList;
