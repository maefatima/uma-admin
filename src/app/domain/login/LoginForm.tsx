import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import InputField from "../../shared/components/fields/InputFields";
import PrimaryButton from "../../shared/components/buttons/PrimaryButton";
import LottieAnimation from "../../shared/components/lottie-animation/Animation";
import loginAnimationData from "../../shared/assets/animation/sample.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosError } from "axios"; // Import AxiosError
import AlertModal from "../../shared/components/modals/alert-modal";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert modal
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeAlert = () => {
    setAlertMessage(null); // Close the modal
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    console.log("Login form submitted with:", { username, password });

    if (!username || !password) {
      setAlertMessage("Please fill in all fields"); // Show modal instead of alert
      console.log("Validation failed: Empty fields");
      return;
    }

    setIsLoggingIn(true);

    try {
      console.log("Sending login request to backend...");
      const response = await axios.post(
        "https://uma-backend-production-d139.up.railway.app/admin-accounts/login",
        { username, password }
      );

      console.log("Backend response received:", response.data);

      // Explicitly check for the message
      if (response.data?.message === "Login successful") {
        console.log("Login successful. Proceeding to dashboard...");
        localStorage.setItem("adminUsername", username); // Save username to localStorage
        navigate("/dashboard");
      } else {
        console.error("Unexpected backend response format:", response.data);
        setAlertMessage(
          "Unexpected response from backend. Please contact support."
        );
      }
    } catch (err) {
      console.error("Login request failed:", err);

      if (axios.isAxiosError(err)) {
        console.error("Axios error response:", err.response?.data);
        setAlertMessage(err.response?.data?.message || "Invalid credentials.");
      } else {
        console.error("Unexpected error:", err);
        setAlertMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoggingIn(false);
      console.log("Login Process finished.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <LottieAnimation animationData={loginAnimationData} />
      </div>

      <div className="login-right">
        <div className="login-header">
          <h2>Welcome to UMArket!</h2>
          <p className="login-subtitle">
            A Digital Marketplace for Livestock Trading
          </p>
        </div>
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
        </form>
      </div>

      {/* Alert Modal Component */}
      {alertMessage && (
        <AlertModal
          isOpen={true}
          title="Login Alert"
          message={alertMessage}
          onCancel={closeAlert} // OK button will close the modal
        />
      )}
    </div>
  );
}

export default LoginForm;
