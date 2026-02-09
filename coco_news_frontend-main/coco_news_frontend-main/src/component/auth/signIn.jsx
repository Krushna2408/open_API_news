import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import Newzimage from '../../assets/images/CocoNewz-image.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons from react-icons

const LoginForm = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      navigate("/homepage");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      const response = await fetch(`${API_KEY}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
  
      // Store token and role in sessionStorage
      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("userRole", data.role); // Store role
  
      navigate("/homepage");
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
              {/* Login Form */}
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h1>Welcome back</h1>
                  <p>Login to CocoNewz</p>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email"></label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="form-group password-container">
                  <label htmlFor="password"></label>
                  <input
                    id="password"
                    placeholder="Enter Your Password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    required
                  />
                  <div 
                    className="password-toggle" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} /> // Eye Slash icon when password is visible
                    ) : (
                      <FaEye size={20} /> // Eye icon when password is hidden
                    )}
                  </div>
                </div>

                {/* Forgot Password Link - Now Below Password Field */}
                <div className="forgot-password-container">
                  <Link to="/forgetpassword" className="forgot-password">
                    Forgot your password?
                  </Link>
                </div>

                {/* Error Message */}
                {error && <div className="error-message">{error}</div>}

                {/* Login Button */}
                <button type="submit" className="btn-primary">
                  Login
                </button>

                {/* Divider */}
                <div className="divider">
                  <span>Or continue with</span>
                </div>

                {/* Signup Link */}
                <div className="signup-link">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
              </form>

              {/* Image Container (Visible on larger screens) */}
              <div className="image-container">
                <img src={Newzimage} alt="Login Illustration" className="login-image" />
              </div>
            </div>
          </div>

          {/* Terms */}
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

export default LoginForm;
