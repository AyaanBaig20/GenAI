import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {useNavigate} from "react-router-dom"

const Login = () => {
  let navigate = useNavigate()
  const { loading, handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({
      email: formData.email,
      password: formData.password,
    });
    navigate("/")
  };
  if (loading) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <label className={formData.email ? "shrink" : ""}>
              Email Address
            </label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className={formData.password ? "shrink" : ""}>
              Password
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>

          <p className="footer-text">
            Don't have an account?{" "}
              <Link to={"/signup"}>Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
