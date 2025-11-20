import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LearnPage from "./components/LearnPage";
import PuzzlePage from "./components/PuzzlePage";
import SocialPage from "./components/SocialPage";
import WatchPage from "./components/WatchPage";
import NewsPage from "./components/NewsPage";
import MenuPage from "./components/MenuPage";
import ChessCanvas from "./components/chess"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/puzzle" element={<PuzzlePage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/chess" element={<ChessCanvas />} />
      </Routes>
    </Router>
  );
}

export default App;
