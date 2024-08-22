import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = {
      username,
      password,
    };
    console.log(JSON.stringify(value));

    try {
      const response = await axios.post(
        "https://dev-retail.jiddiy.uz/services/user-management-ms/api/users/token",
        value
      );

      localStorage.setItem('authToken', response.data.data.access_token, 3600);
      navigate('/')
      console.log("Response:", response.data);
    } catch (err) {
      setError("Login failed");
      console.error("Error:", err);
    }

    
  };
  if(localStorage.getItem('authToken')){
    return <Navigate to={'/'}/>
}

  return (
    <>
      <div className="login">
        <div className="page">
          <h1>Retail Ui</h1>
          <form onSubmit={handleSubmit}>
            <div className="inp">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
