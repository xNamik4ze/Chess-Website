import { useState } from "react";
import { loginUser } from "../api/auth";
import { LoginPayload } from "../types";

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

      window.location.href = "/";
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        value={data.username}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
