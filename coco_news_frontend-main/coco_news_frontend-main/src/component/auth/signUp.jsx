import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import Newzimage from "../../assets/images/CocoNewz-image.jpg";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const API_KEY = process.env.REACT_APP_API_URL;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    const userData = { name, email, password };
  
    try {
      const response = await fetch(`${API_KEY}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
  
      console.log("Signup successful:", data);
      navigate("/signin"); // Redirect after successful signup
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };
  
  
  


  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="card">
            <div className="card-content">
              {/* Signup Form */}
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h1>Create an account</h1>
                  <p>Sign up for the latest Newz</p>
                </div>

                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name"></label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email"></label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password"></label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                  <label htmlFor="confirmPassword"></label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Error Message */}
                {error && <div className="error-message">{error}</div>}

                {/* Signup Button */}
                <button type="submit" className="btn-primary">
                  Sign Up
                </button>

                {/* Divider */}
                <div className="divider">
                  <span>Or sign up with</span>
                </div>

                {/* Signup Link */}
                <div className="signup-link">
                  Already have an account? <Link to="/signin">Sign In</Link>
                </div>
              </form>

              {/* Image Container (Only visible on large screens) */}
              <div className="image-container">
                <img
                  src={Newzimage}
                  alt="Signup Illustration"
                  className="login-image"
                />
              </div>
            </div>
          </div>

          {/* Terms Section */}
          <div className="terms">
            By clicking continue, you agree to our{" "}
            <Link to="#">Terms of Service</Link> and{" "}
            <Link to="#">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
