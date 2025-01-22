// src/components/MarkdownList.tsx
import React, { useEffect, useState } from "react";
import { fetchMarkdownList } from "../services/api";
import styles from "../styles/MarkdownList.module.scss"; // SCSSモジュール例

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
        return <div className={styles.errorMessage}>エラー: {error}</div>;
    }

    return (
        <div className={styles.mdListContainer}>
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
