import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarkdownList from "./components/MarkdownList";
import MarkdownDetail from "./components/MarkdownDetail";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MarkdownList />} />
                <Route path="/detail/:slug" element={<MarkdownDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
