import React from "react";
import Lottie from "lottie-react"; // Import Lottie
import "./Animation.scss";

interface LottieAnimationProps {
  animationData: object; // Define the type for animationData prop
  loop?: boolean;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = true,
  className,
}) => {
  return (
    <div className="animation-container">
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
};

export default LottieAnimation;
