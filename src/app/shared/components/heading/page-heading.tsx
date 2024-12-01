import React from "react";
import "./page-heading.scss";
import vector from "../../assets/images/vector.svg";
import placeholderImage from "../../assets/images/profile.jpg";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  profileImage?: string; // Make profileImage optional
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
          <img
            src={
              profileImage && profileImage.trim() !== ""
                ? profileImage
                : placeholderImage
            }
            alt="Profile"
          />
        </div>
      </div>

      <div className="design-element">
        <img src={vector} alt="Vector" />
      </div>
    </div>
  );
}

export default PageHeading;
