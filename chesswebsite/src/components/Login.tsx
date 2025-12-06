import { useState } from "react";
import { loginUser } from "../api/auth";
import { LoginPayload } from "../types";
import React from "react"; 
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#282c34', // Nền tối
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox: {
        backgroundColor: '#36393f', // Box tối hơn
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        width: '350px',
        textAlign: 'center' as const,
        color: 'white',
    },
    inputGroup: {
        marginBottom: '20px',
        textAlign: 'left' as const,
    },
    input: {
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#40444b',
        color: 'white',
        fontSize: '1em',
        boxSizing: 'border-box' as const,
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold' as const,
        color: '#b9bbbe',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4e90fe', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.1em',
        fontWeight: 'bold' as const,
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s', 
    },
    heading: {
        marginBottom: '25px',
        fontSize: '1.8em',
        color: '#ffffff',
    },
    registerLink: {
        marginTop: '20px',
        fontSize: '0.9em',
        color: '#b9bbbe',
    },
    link: {
        color: '#4e90fe',
        textDecoration: 'none',
        fontWeight: 'bold' as const,
    }
};

export default function Login() {
  const [data, setData] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.data.token);
      alert("Login success!");
      window.location.href = "/online";

      window.location.href = "/";
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
        <div style={styles.loginBox}>
            <h2 style={styles.heading}>Đăng Nhập</h2>
            <form onSubmit={handleSubmit}>
                
    
                <div style={styles.inputGroup}>
                    <label htmlFor="username" style={styles.label}>Tên người dùng</label>
                    <input
                        style={styles.input}
                        name="username"
                        placeholder="Username"
                        value={data.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                
                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Mật khẩu</label>
                    <input
                        style={styles.input}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
               
                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>
            
            <p style={styles.registerLink}>
                Chưa có tài khoản? <a href="/register" style={styles.link}>Đăng ký ngay</a>
            </p>
        </div>
    </div>
  );
}