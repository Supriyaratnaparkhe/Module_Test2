import React, { useEffect } from "react";
import "./Popup.css";
const Popup = ({
  show,
  handleClose,
  handleCreateGroup,
  newGroupName,
  setNewGroupName,
  colorOptions,
  selectedColor,
  setSelectedColor,
}) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (show) {
        if (!e.target.closest(".modal-content")) {
          handleClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, handleClose]);
  return (
    show && (
      <div className="modal">
        <div className="modal-content">
          <h2>Create New Notes Group</h2>
          <div className="row1">
            <div className="ele1">Group Name</div>
            <div className="group-input">
              <input
                type="text"
                value={newGroupName}
                placeholder="Enter group name"
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
          </div>
          <div className="color-options row2">
            <div className="ele1">Choose color</div>
            <div>
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={selectedColor === color ? "selected" : ""}
                ></button>
              ))}
            </div>
          </div>
          <div className="row3">
            <div className="but1">
              <button onClick={handleCreateGroup}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
