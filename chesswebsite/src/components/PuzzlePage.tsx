import React from "react";
import { Link } from "react-router-dom";

const PuzzlePage: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: "20px 20px 20px 70px",
        backgroundColor: "#d9d7d2",
        color: "#333",
        backgroundImage: "url('/images/chess-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div style={{ paddingTop: "3ch" }} className="main-thumbnail">
        <div className="frame">
          <h1 style={{ color: "black" }}>QUIZZES</h1>
        </div>
      </div>

      {/* Sidebar */}
      <nav className="sidebar">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="logo">CHESSENA</div>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/chess">
              <span className="icon">🎮</span>
              <span className="text">Play</span>
            </Link>
          </li>
          <li>
            <Link to="/puzzle">
              <span className="icon">🧩</span>
              <span className="text">Puzzles</span>
            </Link>
          </li>
          <li>
            <Link to="/learn">
              <span className="icon">📚</span>
              <span className="text">Learn</span>
            </Link>
          </li>
          <li>
            <Link to="/watch">
              <span className="icon">🎥</span>
              <span className="text">Watch</span>
            </Link>
          </li>
          <li>
            <Link to="/news">
              <span className="icon">📰</span>
              <span className="text">News</span>
            </Link>
          </li>
          <li>
            <Link to="/social">
              <span className="icon">👥</span>
              <span className="text">Social</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="container">
        <div className="main-thumbnail">
          <a href="https://lichess.org/training" target="_blank" rel="noopener noreferrer">
            <div className="frame">
              <img src="/images/quiz1.png" alt="Quiz 1" />
              <span className="title">Basic Rules Of Chess</span>
              <div className="author">By lichess</div>
              <p className="summary">
                Test your understanding of chess fundamentals like legal moves and piece value.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PuzzlePage;
