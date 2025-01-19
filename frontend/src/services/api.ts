export async function fetchMarkdownList(): Promise<{ slug: string; title: string }[]> {
    const url = `${import.meta.env.VITE_API_BASE_URL}/markdown/list`;
    const res = await fetch(url, {
        // Referer を意図的に送る場合は headerで指定
        // ただし通常ブラウザは自動付与する
        headers: {
            // "Referer": "https://mydomain.com/"  // テスト用
        },
    });
    if (!res.ok) throw new Error("Failed to fetch list");
    return res.json();
}

export async function fetchMarkdownDetail(slug: string): Promise<{ slug: string; content: string }> {
    const url = `${import.meta.env.VITE_API_BASE_URL}/markdown/${slug}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch detail");
    return res.json();
}
