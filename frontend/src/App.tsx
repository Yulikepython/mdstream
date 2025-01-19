// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MarkdownList from "./components/MarkdownList";
import MarkdownDetail from "./components/MarkdownDetail";
import styles from "./styles/App.module.scss";

function App() {
    return (
        <div className={styles.appContainer}>
            <Router>
                <header className={styles.header}>
                    {/* "MDStream" をクリックすると "/" に移動 */}
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
                    </Routes>
                </main>

                <footer className={styles.footer}>
                    <p>&copy; 2025 MDStream. All rights reserved.</p>
                </footer>
            </Router>
        </div>
    );
}

export default App;
