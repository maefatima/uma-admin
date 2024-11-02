import React from "react";
import Lottie from "lottie-react"; // Import Lottie
import "./Animation.scss";

interface LottieAnimationProps {
  animationData: object; // Define the type for animationData prop
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  return (
    <div className="animation-container">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieAnimation;
