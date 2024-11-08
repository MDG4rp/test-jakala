import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import "../styles/Login.css";
import { login } from "../api/services/login-service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      console.log("Token JWT:", data.token);
      dispatch(
        loginSuccess({ token: data.token, refreshToken: data.refreshToken })
      ); // Dispatch dell'azione loginSuccess
      localStorage.setItem("Token", data.token); // Salvo il token nel localStorage
      localStorage.setItem("Refresh token", data.refreshToken); // Salvo il refreshToken nel localStorage
      navigate("/dashboard"); // Solo dopo essermi loggato vado alla dashboard
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Accedi</h2>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
