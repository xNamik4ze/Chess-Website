import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserInfoBar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const [elo, setElo] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:8080/api/user/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsername(data.username);
                setElo(data.elo);
            })
            .catch(err => console.error(err));
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUsername(null);
        navigate("/login");
    };

    // ⭐ Nếu chưa login → hiện nút login + register
    if (!username) {
        return (
            <div style={styles.container}>
                <button style={styles.loginBtn} onClick={() => navigate("/login")}>
                    Đăng nhập
                </button>
                <button style={styles.registerBtn} onClick={() => navigate("/register")}>
                    Đăng ký
                </button>
            </div>
        );
    }

    // ⭐ Nếu đã login → hiện username + logout
    return (
        <div style={styles.container}>
            <div style={styles.userBox}>
                <span style={styles.username}>
                    {username} {elo !== null && <span> | ⭐ {elo}</span>}
                </span>
                <button style={styles.logoutBtn} onClick={logout}>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },

    userBox: {
        background: "rgba(255,255,255,0.1)",
        padding: "10px 15px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },

    username: {
        fontWeight: "bold",
        fontSize: "1.1rem",
    },

    logoutBtn: {
        padding: "6px 12px",
        background: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },

    loginBtn: {
        padding: "6px 12px",
        background: "#3498db",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },

    registerBtn: {
        padding: "6px 12px",
        background: "#2ecc71",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
};