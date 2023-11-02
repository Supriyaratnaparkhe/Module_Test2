import React, { useRef, useEffect } from "react";
import "./NoteComponent.css";
import img1 from "./assets/default-img.png";
import vector from "./assets/Vector.png";
import Enter from "./assets/Enter.png";
import ProfileLogo from "./ProfileLogo";
import backvector from "./assets/backvector.png";
const NoteComponent = ({
  currentGroup,
  notes,
  inputNote,
  addNote,
  handleNoteChange,
  isMobile,
}) => {
  const notesEndRef = useRef(null);

  useEffect(() => {
    notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notes]);
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNote();
    }
  };
  const handleback = () => {
    window.location.reload(false);
  };
  return (
    <div className="main">
      {currentGroup.name ? (
        <div className="notes-section">
          <div className="navbar">
            <div
              className="back"
              style={isMobile ? { display: "block" } : { display: "none" }}
            >
              <img src={backvector} onClick={handleback} alt="back" />
            </div>
            <div
              className="profile-logo"
              style={{ backgroundColor: currentGroup.color }}
            >
              <div>
                <ProfileLogo groupName={currentGroup.name} />
              </div>
            </div>
            <div className="cur-group">{currentGroup.name} Notes</div>
          </div>

          <div className="notes-display">
            {notes.map((note, index) => (
              <div key={index} className="note-item">
                <div className="timestamp">
                  <p>{note.timeCreated}</p>
                  <p>{note.dateCreated}</p>
                </div>
                <div className="notestamp">
                  {" "}
                  <p>{note.content}</p>
                </div>
              </div>
            ))}
            <div ref={notesEndRef} />
          </div>
          <div className="input-notes">
            <form onKeyPress={handleSubmit}>
              <textarea
                value={inputNote}
                placeholder="Enter your text here..........."
                onChange={handleNoteChange}
              ></textarea>
              <div className="enter">
                <img onClick={addNote} src={Enter} alt="enter" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="defaultpage">
          <div className="dafaultimg">
            <img src={img1} alt="img1" />
          </div>
          <div className="default-heading">Pocket Notes</div>
          <div className="default-text">
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
          <div className="footer">
            <img src={vector} alt="vector" /> &nbsp; end-to-end encrypted
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteComponent;
