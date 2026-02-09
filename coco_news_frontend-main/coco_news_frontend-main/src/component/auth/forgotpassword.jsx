import { useState } from "react";
import './forgotPassword.css'; // Ensure you import the correct CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!email) {
      setError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
    } else {
      setError(""); // Proceed with password reset logic
      console.log("Password reset requested for:", email);
      // Implement password reset functionality here
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="forgot-password-card-content">
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="forgot-password-form-header">
              <h1>Forgot Password</h1>
              <p>Enter your email to reset your password</p>
            </div>
            <div className="forgot-password-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="m@example.com"
                required
              />
              {error && <div className="forgot-password-error-message">{error}</div>}
            </div>
            <button type="submit" className="forgot-password-btn-primary">
              Reset Password
            </button>
            <div className="forgot-password-login-link">
              Remember your password? <a href="/signin">Log in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
