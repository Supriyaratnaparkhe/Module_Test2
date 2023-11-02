import React from "react";
import "./GroupComponent.css";
import ProfileLogo from "./ProfileLogo";

const GroupComponent = ({ groups, handleGroupSelection, currentGroup }) => {
  return (
    <div className="group-list">
      {groups.map((group, index) => (
        <div
          key={index}
          onClick={() => handleGroupSelection(group.name, group.color)}
          className={`group ${
            group.name === currentGroup.name ? "selected-group" : ""
          }`}
        >
          <div
            className="profile-logo"
            style={{ backgroundColor: group.color }}
          >
            <ProfileLogo groupName={group.name} />{" "}
          </div>

          <div className="group-name">{group.name}</div>
        </div>
      ))}
    </div>
  );
};

export default GroupComponent;
