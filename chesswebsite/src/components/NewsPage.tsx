import React from "react";
import { Link } from "react-router-dom";
import "../styles/NewsPage.css";

const NewsPage: React.FC = () => {
  return (
    <>
      <div>
        {/* Header */}
        <div className="main-thumbnail">
          <div className="frame">
            <h1>NEWS</h1>
          </div>
        </div>

        {/* Sidebar */}
        <nav className="sidebar">
          <Link to="/">
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

        <div className="container">
          {/* Main news */}
          <div className="main-thumbnail">
            <a
              href="https://www.chess.com/news/view/nihal-nakamura-win-titled-tuesday-july-8-2025"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="frame">
                <img src="/images/news1.png" alt="News 1" />
                <span className="title">
                  Nakamura Resets Own Rating Record With Big Tuesday
                </span>
                <div className="author">By Nathaniel Green</div>
                <p className="summary">
                  GM Nihal Sarin và GM Hikaru Nakamura thắng Titled Tuesday...
                </p>
              </div>
            </a>
          </div>

          {/* Others */}
          <div className="thumbnail-grid">
          </div>

          {/* More news */}
          <div className="main-thumbnail" style={{ paddingTop: "3ch" }}>
            <div className="frame">
              <a
                href="https://www.chess.com/news"
                target="_blank"
                rel="noopener noreferrer"
                className="title"
                style={{ fontSize: "3ch" }}
              >
                More news
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
