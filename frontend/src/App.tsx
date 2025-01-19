// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarkdownList from "./components/MarkdownList";
import MarkdownDetail from "./components/MarkdownDetail";
import styles from "./styles/App.module.scss"; // SCSSをimportする例

function App() {
    return (
        <div className={styles.appContainer}>
            <Router>
                <header className={styles.header}>
                    <h1>MDStream</h1>
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
