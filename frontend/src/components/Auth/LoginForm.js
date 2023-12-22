// src/components/LoginForm.js
import React, { useContext, useState } from "react";
import axios from "axios";
import "./styles.css"; // Import the styles
import { UserContext } from "../hooks/authHook";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginButton = async () => {
    try {
      const response = await axios.post(`${process.env.APP_API}/signin`, {
        email: username,
        password,
      });

      // Assuming the API returns a JWT token on successful login
      const token = response.data.token;
      handleLogin(token);
      // Store the token in localStorage (you may want to use more secure storage)
      localStorage.setItem("token", token);

      // Call the onLogin function passed as a prop
      onLogin();

      // Redirect to Dashboard (you can use react-router-dom for navigation)
      // Example: history.push('/dashboard');
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error("Login failed:", error.message);
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <h2>Login</h2>
      <p>Email</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>Password</p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="authButton" onClick={handleLoginButton}>
        Login
      </button>
      <button onClick={redirectToRegister} className="authButton">
        Register
      </button>
    </div>
  );
};

export default LoginForm;
