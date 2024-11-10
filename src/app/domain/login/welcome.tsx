// Welcome.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./welcome.scss";
import uma from "../../shared/assets/images/UMA.jpeg";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="welcome">
      <img src={uma} alt="UMA" className="uma-image" />
    </div>
  );
}

export default Welcome;
