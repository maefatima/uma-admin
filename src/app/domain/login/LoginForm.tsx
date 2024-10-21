import React, { useState } from "react";
import "./LoginForm.scss";
import InputField from "../../shared/components/fields/InputFields";
import PrimaryButton from "../../shared/components/buttons/PrimaryButton";
import LottieAnimation from "../../shared/components/lottie-animation/LoginAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate a login action
    setIsLoggingIn(true);
    setTimeout(() => {
      console.log("Logging in with:", { username, password });
      setIsLoggingIn(false);
    }, 2000);
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <LottieAnimation />
      </div>

      <div className="login-right">
        <h2>Welcome Back!</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <InputField
            className="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="password-field">
            <InputField
              className="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="toggle-password" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              <span>{showPassword ? "Show" : "Hide"}</span>
            </div>
          </div>

          <PrimaryButton
            className="login-button"
            buttonText="LOGIN"
            onClick={handleLogin}
            disabled={isLoggingIn} // Disable the button while logging in
          />

          <p className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
