import React, { useState } from 'react';
import './Signup.scss';
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  let navigate = useNavigate()
  let {handleSignup,loading} = useAuth()
  const [formData, setFormData] = useState({
    username:"",
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleSignup({username:formData.username,email:formData.email,password:formData.password})
    navigate("/")
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <p>Please enter your details.</p>

          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label className={formData.email ? 'shrink' : ''}>Username </label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <label className={formData.email ? 'shrink' : ''}>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className={formData.password ? 'shrink' : ''}>Password</label>
          </div>

    
          <button type="submit" className="submit-btn">
            Signup
          </button>

          <div className="social-divider">
            <span>or</span>
          </div>    

          <p className="footer-text">
            Already have an account? <a><Link to={"/login"}>Login</Link> </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;