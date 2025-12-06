import React from "react";
import { Link } from "react-router-dom";
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="logo">CHESSENA</div>
      </a>
      <ul className="nav-links">
        <li>
          <Link to="/chess"><span className="icon">🎮</span><span className="text">Play</span></Link>
        </li>
        <li>
          <Link to="/puzzle"><span className="icon">🧩</span><span className="text">Puzzles</span></Link>
        </li>
        <li>
          <Link to="/learn"><span className="icon">📚</span><span className="text">Learn</span></Link>
        </li>
        <li>
          <Link to="/watch"><span className="icon">🎥</span><span className="text">Watch</span></Link>
        </li>
        <li>
          <Link to="/news"><span className="icon">📰</span><span className="text">News</span></Link>
        </li>
        <li>
          <Link to="/social"><span className="icon">👥</span><span className="text">Social</span></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;