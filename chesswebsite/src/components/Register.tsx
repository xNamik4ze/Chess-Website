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
      alert("Register success!");
      window.location.href = "/login";
    } catch (err) {
      alert("Register failed!");
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
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />

      <input
        name="nationality"
        placeholder="Nationality"
        value={data.nationality}
        onChange={handleChange}
      />

      <input
        name="birthYear"
        placeholder="Birth year"
        type="number"
        value={data.birthYear || ""}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}
