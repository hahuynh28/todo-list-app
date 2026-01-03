import React from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT LOGIN");

    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("LOGIN RESPONSE:", res.data);

      login(res.data.token, res.data.user);
      console.log("LOGIN CALLED");
      navigate("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-background p-6 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:ring"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:ring"
          required
        />

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
