import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import InputField from "../../shared/components/fields/InputFields";
import PrimaryButton from "../../shared/components/buttons/PrimaryButton";
import LottieAnimation from "../../shared/components/lottie-animation/Animation";
import loginAnimationData from "../../shared/assets/animation/animationlogin.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoggingIn(true);
    setTimeout(() => {
      console.log("Logging in with:", { username, password });
      setIsLoggingIn(false);

      // Navigate to the welcome screen
      navigate("/welcome");
    }, 2000);
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <LottieAnimation animationData={loginAnimationData} />
      </div>

      <div className="login-right">
        <h2>Welcome to UMA!</h2>
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
            disabled={isLoggingIn}
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
