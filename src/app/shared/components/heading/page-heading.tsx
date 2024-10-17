import React from "react";
import "./page-heading.scss";
import vector from "../../assets/images/Group-284.jpg";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

function PageHeading({ title, subtitle, icon, className }: PageHeadingProps) {
  return (
    <div className={`page-heading ${className ? className : ""}`}>
      {/* Icon, Title, and Subtitle */}
      {icon && <span className="heading-icon">{icon}</span>}
      <div className="heading-text">
        <h1>{title}</h1>
        {subtitle && <p className="heading-subtitle">{subtitle}</p>}
      </div>

      {/* Design element or image */}
      <div className="design-element">
        <img src={vector} alt="Vector" />
      </div>
    </div>
  );
}

export default PageHeading;
