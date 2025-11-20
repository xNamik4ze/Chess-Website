import React from "react";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chọn chế độ chơi</h1>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => navigate("/chess")} // route /chess
        >
          Chơi với Máy hoặc PvP Local
        </button>
        <button
          style={styles.button}
          onClick={() => navigate("/online")} // route /online
        >
          Chơi Online
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1e1e2f, #2c3e50)",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "30px",
    textShadow: "2px 2px 4px #000",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  button: {
    padding: "15px 35px",
    fontSize: "1.2rem",
    backgroundColor: "#3a86ff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    color: "white",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
};

export default Menu;
