import React from "react";
import { Link } from "react-router-dom";
import "../styles/LearnPage.css";

const LearnPage: React.FC = () => {
  return (
    <div className="learn-page">
      {/* Sidebar */}
      <nav className="sidebar">
        <Link to="/" className="logo">CHESSENA</Link>
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

      {/* Main Content */}
      <div className="main-content">
        <section id="introduction" className="content-section">
          <h1>Hướng Dẫn Chơi Cờ Vua</h1>
          <p>Cờ vua là một trò chơi chiến lược ...</p>
          <p>Trò chơi có thể kết thúc trong các trường hợp sau:</p>
          <ul>
            <li><strong>Chiếu hết (Checkmate):</strong> ...</li>
            <li><strong>Hòa cờ (Stalemate):</strong> ...</li>
            <li><strong>Bỏ cuộc (Resignation):</strong> ...</li>
            <li><strong>Hòa do thỏa thuận:</strong> ...</li>
            <li><strong>Hòa do lặp lại nước đi hoặc luật 50 nước:</strong> ...</li>
          </ul>
        </section>

        <section id="piece-rules" className="content-section">
          <h2>Cách Di Chuyển và Bắt Quân của Các Quân Cờ</h2>

          <div className="piece-section">
            <h3>Vua (King)</h3>
            <p><strong>Di chuyển:</strong> ...</p>
            <p><strong>Bắt quân:</strong> ...</p>
            <img src="/images/vua.jpg" alt="Vua" />
          </div>

          <div className="piece-section">
            <h3>Hậu (Queen)</h3>
            <p><strong>Di chuyển:</strong> ...</p>
            <p><strong>Bắt quân:</strong> ...</p>
            <img src="/images/hau.jpg" alt="Hậu" />
          </div>

          {/* Xe, Tượng, Mã, Tốt */}
          <div className="piece-section">
            <h3>Xe (Rook)</h3>
            <p><strong>Di chuyển:</strong> ...</p>
            <p><strong>Bắt quân:</strong> ...</p>
            <img src="/images/xe.jpg" alt="Xe" />
          </div>

          <div className="piece-section">
            <h3>Tượng (Bishop)</h3>
            <p><strong>Di chuyển:</strong> ...</p>
            <p><strong>Bắt quân:</strong> ...</p>
            <img src="/images/tuong.jpg" alt="Tượng" />
          </div>

          <div className="piece-section">
            <h3>Mã (Knight)</h3>
            <p><strong>Di chuyển:</strong> ...</p>
            <p><strong>Bắt quân:</strong> ...</p>
            <img src="/images/Ma.gif" alt="Mã" />
          </div>

          <div className="piece-section">
            <h3>Tốt (Pawn)</h3>
            <p><strong>Di chuyển:</strong> ...</p>
            <p><strong>Bắt quân:</strong> ...</p>
            <div className="pawn-images">
              <img src="/images/tot.jpg" alt="Tốt" />
              <img src="/images/tot1.jpg" alt="Tốt ăn" />
            </div>
            <p><strong>Đặc biệt:</strong> Tốt có thể phong thành Hậu, Xe, Mã, Tượng.</p>
            <img src="/images/tot2.jpg" alt="Phong Tốt" />
          </div>

          <Link to="/chess" className="play-button">Chơi</Link>
        </section>
      </div>
    </div>
  );
};

export default LearnPage;
