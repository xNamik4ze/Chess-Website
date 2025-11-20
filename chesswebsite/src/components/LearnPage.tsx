import React from "react";
import { Link } from "react-router-dom";

const LearnPage: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        background: "linear-gradient(135deg, #1e1e2f, #2c3e50)",
        backgroundImage: "url('/images/chess-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#2c3e50",
      }}
    >
      {/* Sidebar */}
      <nav
        className="sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "50px",
          height: "100vh",
          backgroundColor: "#32ef4bdf",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "15px",
          boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
          borderRadius: "0 10px 10px 0",
          transition: "width 0.3s ease",
          overflowX: "hidden",
          zIndex: 1000,
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className="logo"
            style={{
              fontSize: 0,
              fontWeight: "bold",
              marginBottom: "20px",
              whiteSpace: "nowrap",
              transition: "font-size 0.3s ease, opacity 0.3s ease",
              opacity: 0,
            }}
          >
            CHESSENA
          </div>
        </Link>
        <ul className="nav-links" style={{ listStyle: "none", padding: 0, width: "100%" }}>
          <li>
            <Link to="/chess" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <span className="icon" style={{ fontSize: 28, marginRight: 10 }}>🎮</span>
              <span className="text" style={{ opacity: 0, visibility: "hidden", transition: "opacity 0.3s ease" }}>Play</span>
            </Link>
          </li>
          <li>
            <Link to="/puzzle" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <span className="icon" style={{ fontSize: 28, marginRight: 10 }}>🧩</span>
              <span className="text" style={{ opacity: 0, visibility: "hidden", transition: "opacity 0.3s ease" }}>Puzzles</span>
            </Link>
          </li>
          <li>
            <Link to="/learn" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <span className="icon" style={{ fontSize: 28, marginRight: 10 }}>📚</span>
              <span className="text" style={{ opacity: 0, visibility: "hidden", transition: "opacity 0.3s ease" }}>Learn</span>
            </Link>
          </li>
          <li>
            <Link to="/watch" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <span className="icon" style={{ fontSize: 28, marginRight: 10 }}>🎥</span>
              <span className="text" style={{ opacity: 0, visibility: "hidden", transition: "opacity 0.3s ease" }}>Watch</span>
            </Link>
          </li>
          <li>
            <Link to="/news" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <span className="icon" style={{ fontSize: 28, marginRight: 10 }}>📰</span>
              <span className="text" style={{ opacity: 0, visibility: "hidden", transition: "opacity 0.3s ease" }}>News</span>
            </Link>
          </li>
          <li>
            <Link to="/social" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <span className="icon" style={{ fontSize: 28, marginRight: 10 }}>👥</span>
              <span className="text" style={{ opacity: 0, visibility: "hidden", transition: "opacity 0.3s ease" }}>Social</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div style={{ marginLeft: 70, padding: "20px" }}>
        <section id="introduction" style={{ maxWidth: 800, margin: "20px auto", background: "whitesmoke", padding: 20, borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <h1>Hướng Dẫn Chơi Cờ Vua</h1>
          <p>Cờ vua là một trò chơi chiến lược được chơi trên bàn cờ 8x8, gồm 64 ô vuông xen kẽ màu sáng và tối. Mỗi người chơi bắt đầu với 16 quân cờ: 1 Vua, 1 Hậu, 2 Xe, 2 Mã, 2 Tượng, và 8 Tốt. Mục tiêu của trò chơi là chiếu hết (checkmate) vua của đối phương, tức là đặt vua vào tình thế bị đe dọa bắt mà không thể thoát.</p>
          <p>Trò chơi có thể kết thúc trong các trường hợp sau:</p>
          <ul>
            <li><strong>Chiếu hết (Checkmate):</strong> Vua bị đe dọa và không có nước đi hợp lệ để thoát.</li>
            <li><strong>Hòa cờ (Stalemate):</strong> Người chơi không có nước đi hợp lệ và vua không bị chiếu.</li>
            <li><strong>Bỏ cuộc (Resignation):</strong> Một người chơi tự nguyện bỏ cuộc.</li>
            <li><strong>Hòa do thỏa thuận:</strong> Cả hai người chơi đồng ý hòa.</li>
            <li><strong>Hòa do lặp lại nước đi hoặc luật 50 nước:</strong> Vị trí lặp lại ba lần hoặc không có quân nào bị bắt và không có tốt nào di chuyển trong 50 lượt liên tiếp.</li>
          </ul>
        </section>

        <section id="piece-rules" style={{ maxWidth: 800, margin: "20px auto", background: "whitesmoke", padding: 20, borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <h2>Cách Di Chuyển và Bắt Quân của Các Quân Cờ</h2>

          <div className="piece-section" style={{ marginBottom: 30 }}>
            <h3>Vua (King)</h3>
            <p><strong>Di chuyển:</strong> Vua di chuyển một ô theo bất kỳ hướng nào: ngang, dọc, hoặc chéo, miễn là ô đó không bị đe dọa. Vua cũng có thể thực hiện nước đi đặc biệt gọi là nhập thành (castling) với xe trong một số điều kiện.</p>
            <p><strong>Bắt quân:</strong> Vua bắt quân đối phương bằng cách di chuyển vào ô chứa quân đó.</p>
            <img src="/images/vua.jpg" alt="Cách di chuyển của Vua" style={{ maxWidth: 300, display: "block", margin: "10px auto" }} />
          </div>

          <div className="piece-section" style={{ marginBottom: 30 }}>
            <h3>Hậu (Queen)</h3>
            <p><strong>Di chuyển:</strong> Hậu có thể di chuyển bất kỳ số ô nào theo hướng ngang, dọc, hoặc chéo, miễn là không bị cản bởi quân khác.</p>
            <p><strong>Bắt quân:</strong> Hậu bắt quân đối phương bằng cách di chuyển vào ô chứa quân đó.</p>
            <img src="/images/hau.jpg" alt="Cách di chuyển của Hậu" style={{ maxWidth: 300, display: "block", margin: "10px auto" }} />
          </div>

          {/* Thêm Xe, Tượng, Mã, Tốt tương tự */}
          <div className="piece-section" style={{ marginBottom: 30 }}>
            <h3>Xe (Rook)</h3>
            <p><strong>Di chuyển:</strong> Xe di chuyển bất kỳ số ô nào theo hướng ngang hoặc dọc, miễn là không bị cản bởi quân khác.</p>
            <p><strong>Bắt quân:</strong> Xe bắt quân đối phương bằng cách di chuyển vào ô chứa quân đó.</p>
            <img src="/images/xe.jpg" alt="Cách di chuyển của Xe" style={{ maxWidth: 300, display: "block", margin: "10px auto" }} />
          </div>

          <div className="piece-section" style={{ marginBottom: 30 }}>
            <h3>Tượng (Bishop)</h3>
            <p><strong>Di chuyển:</strong> Tượng di chuyển bất kỳ số ô nào theo hướng chéo, miễn là không bị cản bởi quân khác. Mỗi tượng chỉ di chuyển trên các ô cùng màu với ô ban đầu của nó.</p>
            <p><strong>Bắt quân:</strong> Tượng bắt quân đối phương bằng cách di chuyển vào ô chứa quân đó.</p>
            <img src="/images/tuong.jpg" alt="Cách di chuyển của Tượng" style={{ maxWidth: 300, display: "block", margin: "10px auto" }} />
          </div>

          <div className="piece-section" style={{ marginBottom: 30 }}>
            <h3>Mã (Knight)</h3>
            <p><strong>Di chuyển:</strong> Mã di chuyển theo hình chữ "L": hai ô theo một hướng (ngang hoặc dọc) và một ô vuông góc, hoặc một ô theo một hướng và hai ô vuông góc. Mã là quân cờ duy nhất có thể "nhảy" qua các quân khác.</p>
            <p><strong>Bắt quân:</strong> Mã bắt quân đối phương bằng cách di chuyển vào ô chứa quân đó.</p>
            <img src="/images/Ma.gif" alt="Cách di chuyển của Mã" style={{ maxWidth: 300, display: "block", margin: "10px auto" }} />
          </div>

          <div className="piece-section" style={{ marginBottom: 30 }}>
            <h3>Tốt (Pawn)</h3>
            <p><strong>Di chuyển:</strong> Tốt di chuyển thẳng về phía trước một ô (hướng về phía đối phương). Từ vị trí ban đầu, tốt có thể di chuyển hai ô. Tốt không thể đi lùi.</p>
            <p><strong>Bắt quân:</strong> Tốt bắt quân đối phương bằng cách di chuyển chéo một ô về phía trước. Tốt cũng có thể bắt "en passant" trong trường hợp đặc biệt khi tốt đối phương di chuyển hai ô từ vị trí ban đầu.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <img src="/images/tot.jpg" alt="Cách di chuyển của Tốt" style={{ maxWidth: 150 }} />
              <img src="/images/tot1.jpg" alt="Cách Tốt ăn" style={{ maxWidth: 150 }} />
            </div>
            <p><strong>Đặc biệt:</strong> Tốt có thể phong thành các con Hậu, Xe, Mã, Tượng khi di chuyển đến hết bàn cờ.</p>
            <img src="/images/tot2.jpg" alt="Phong Tốt" style={{ maxWidth: 300, display: "block", margin: "10px auto" }} />
          </div>

          <Link to="/chess" style={{
            backgroundColor: "#1d6d03",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8,
            fontSize: 16,
            display: "inline-block",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            marginTop: 20
          }}>
            Chơi
          </Link>
        </section>
      </div>
    </div>
  );
};

export default LearnPage;
