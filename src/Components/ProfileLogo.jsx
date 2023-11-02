import React from "react";
import "./ProfileLogo.css";

const getInitials = (groupName) => {
  if (groupName) {
    const initials = groupName.toUpperCase().slice(0, 2);
    return initials;
  }
  return "";
};

const ProfileLogo = ({ groupName }) => {
  return (
    <div className="profile-logo" title={groupName}>
      {getInitials(groupName)}
    </div>
  );
};

export default ProfileLogo;
