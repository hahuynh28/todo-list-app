import React from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT LOGIN");

    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("LOGIN RESPONSE:", res.data);

      login(res.data.token, res.data.user);
      console.log("LOGIN CALLED");
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="current-password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
