import React from "react";
import "./page-heading.scss";
import vector from "../../assets/images/vector.svg";
import profile from "../../assets/images/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
        <div className="profile-heading">
          <span className="profile-span">
            <img src={profile} alt="Profile" />
          </span>
        </div>
      </div>

      <div className="design-element">
        <img src={vector} alt="Vector" />
      </div>
      {/* Design element or image */}
    </div>
  );
}

export default PageHeading;
