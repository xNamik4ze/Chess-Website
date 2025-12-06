import { useState } from "react";
import { registerUser } from "../api/auth";
import { RegisterPayload } from "../types";

export default function Register() {
  const [data, setData] = useState<RegisterPayload>({
    username: "",
    email: "",
    password: "",
    nationality: "",
    birthYear: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.name === "birthYear" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser(data);
      alert("Đăng ký thành công!");
      window.location.href = "/login";
    } catch (err) {
      alert("Đăng ký thất bại!");
      console.error(err);
    }
  };

  return (
    <>
      
      <style>
        {`
          /* CSS Reset/Căn giữa toàn màn hình */
          .register-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f3f4f6;
            padding: 20px;
          }

          /* Form Box */
          .register-form {
            width: 360px;
            background: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0px 6px 20px rgba(0,0,0,0.1);
          }

          /* Title */
          .register-title {
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 24px;
            color: #1f2937;
          }

          /* Grouping Label + Input */
          .input-group {
            margin-bottom: 14px;
          }

          /* Label */
          .input-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 4px;
          }

          /* Input Field */
          .register-input {
            width: 100%;
            padding: 10px 14px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            font-size: 15px;
            outline: none;
            transition: 0.2s;
            box-sizing: border-box; /* Rất quan trọng */
          }

          /* Input Focus State (Hỗ trợ bởi thẻ <style>) */
          .register-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
          }

          /* Button */
          .register-button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            background: #2563eb;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
          }

          /* Button Hover State (Hỗ trợ bởi thẻ <style>) */
          .register-button:hover {
            background: #1e40af;
          }
        `}
      </style>

     
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Đăng ký</h2>

          
          <div className="input-group">
            <label className="input-label" htmlFor="username">
              Họ và tên
            </label>
            <input
              id="username"
              className="register-input"
              name="username"
              placeholder="VD: Nguyễn Văn A"
              value={data.username}
              onChange={handleChange}
            />
          </div>

         
          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="register-input"
              name="email"
              placeholder="VD: nguyenvana123@gmail.com"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          
          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              className="register-input"
              name="password"
              type="password"
              placeholder="VD: 123456"
              value={data.password}
              onChange={handleChange}
            />
          </div>

          
          <div className="input-group">
            <label className="input-label" htmlFor="nationality">
              Quốc tịch
            </label>
            <input
              id="nationality"
              className="register-input"
              name="nationality"
              placeholder="VD: Việt Nam"
              value={data.nationality}
              onChange={handleChange}
            />
          </div>

          
          <div className="input-group">
            <label className="input-label" htmlFor="birthYear">
              Năm sinh
            </label>
            <input
              id="birthYear"
              className="register-input"
              name="birthYear"
              placeholder="VD: 2006"
              type="number"
              value={data.birthYear || ""}
              onChange={handleChange}
            />
          </div>

          <button className="register-button" type="submit">
            Đăng ký ngay
          </button>
        </form>
      </div>
    </>
  );
}