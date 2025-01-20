// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MarkdownList from "./components/MarkdownList";
import MarkdownDetail from "./components/MarkdownDetail";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import styles from "./styles/App.module.scss";

function App() {
    return (
        <div className={styles.appContainer}>
            <Router>
                <header className={styles.header}>
                    <h1>
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            MDStream
                        </Link>
                    </h1>
                </header>

                <main className={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<MarkdownList />} />
                        <Route path="/detail/:slug" element={<MarkdownDetail />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                    </Routes>
                </main>

                <footer className={styles.footer}>
                    <p>&copy; 2025 MDStream. All rights reserved.</p>
                    {/* フッターのリンクを追加 */}
                    <nav style={{ marginTop: "0.5rem" }}>
                        <Link to="/terms" style={{ marginRight: "1rem", color: "#fff" }}>
                            利用規約
                        </Link>
                        <Link to="/privacy" style={{ color: "#fff" }}>
                            個人情報保護
                        </Link>
                    </nav>
                </footer>
            </Router>
        </div>
    );
}

export default App;
