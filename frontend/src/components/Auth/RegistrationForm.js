// src/components/RegistrationForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.APP_API}/signup`, {
        email: email,
        username: username,
        password: password,
      });
      // Handle successful registration, e.g., show a success message
      navigate("/login");

      console.log("Registration successful:", response.data);
    } catch (error) {
      // Handle registration error, e.g., show an error message
      console.error("Registration failed:", error.message);
      // }
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2>Registration</h2>
      <p>UserName</p>
      <input
        type="text"
        placeholder="Enter User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>Email</p>
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Password</p>
      <input
        type="email"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="authButton" onClick={handleRegister}>
        Register
      </button>
      <button className="authButton" onClick={redirectToLogin}>
        Back to Login
      </button>
    </div>
  );
};

export default RegistrationForm;
