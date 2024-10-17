import React from "react";
import Lottie from "lottie-react"; // Import Lottie
import "./LoginAnimation.scss";
import animationData from "../../assets/animation/animationlogin.json";

function LottieAnimation() {
  return (
    <div className="animation-container">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}

export default LottieAnimation;
