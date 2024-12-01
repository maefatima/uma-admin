import React from "react";
import "./page-heading.scss";
import vector from "../../assets/images/vector.svg";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  profileImage: string;
  username: string;
}

function PageHeading({
  title,
  subtitle,
  icon,
  className,
  profileImage,
  username,
}: PageHeadingProps) {
  return (
    <div className={`page-heading ${className ? className : ""}`}>
      {icon && <span className="heading-icon">{icon}</span>}

      <div className="heading-text">
        <h1>{title}</h1>
        {subtitle && <p className="heading-subtitle">{subtitle}</p>}
      </div>
      <div className="profile-heading">
        <div className="user-name">
          <p className="profile-username">{username}</p>
        </div>
        <div className="profile-picture">
          <img src={profileImage} alt="Profile" />
        </div>
      </div>

      <div className="design-element">
        <img src={vector} alt="Vector" />
      </div>
    </div>
  );
}

export default PageHeading;
