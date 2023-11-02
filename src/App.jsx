import React, { useState, useEffect } from "react";
import "./App.css";
import PopupModal from "./Components/Popup";
import GroupsList from "./Components/GroupComponent";
import NoteSection from "./Components/NoteComponent";

const colorOptions = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const App = () => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({ name: "", color: "" });
  const [notes, setNotes] = useState([]);
  const [inputNote, setInputNote] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [toggal, setToggal] = useState(false);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups"));
    if (savedGroups) {
      setGroups(savedGroups);
    }
  }, []);
  
  useEffect(() => {
    const checkIsMobile = () => {
      if (window.matchMedia('(max-width: 600px)').matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    if (currentGroup.name) {
      const savedNotes = JSON.parse(localStorage.getItem(currentGroup.name));
      if (savedNotes) {
        setNotes(savedNotes);
      } else {
        setNotes([]);
      }
    }
  }, [currentGroup.name]);

  const createGroup = () => {
    setShowCreateGroup(true);
  };

  const handleCloseCreateGroup = () => {
    setShowCreateGroup(false);
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim() !== "") {
      setGroups([...groups, { name: newGroupName, color: selectedColor }]);
      localStorage.setItem(
        "groups",
        JSON.stringify([
          ...groups,
          { name: newGroupName, color: selectedColor },
        ])
      );
      setShowCreateGroup(false);
      setNewGroupName("");
    }
  };
  const handleGroupSelection = (groupName, groupColor) => {
    if(isMobile){
      setToggal(true);
    }
    
    setCurrentGroup({ name: groupName, color: groupColor });
  };

  const handleNoteChange = (e) => {
    setInputNote(e.target.value);
  };

  const addNote = () => {
    if (inputNote.trim() !== "") {
      const timestamp = new Date().toLocaleString("en-Us", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const datestamp = new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const newNote = {
        content: inputNote,
        timeCreated: timestamp,
        dateCreated: datestamp,
      };
      setNotes([...notes, newNote]);
      localStorage.setItem(
        currentGroup.name,
        JSON.stringify([...notes, newNote])
      );
      setInputNote("");
    }
  };
  return (
    <div className="app-container">
      <div className="sidebar" style={toggal && isMobile ? { display: 'none' } : {display:'block'}}>
        <div className="app-name">
          <p>Pocket Notes</p>
        </div>
        <div className="create-button">
          <button onClick={createGroup}>+ Create New Group</button>
        </div>
        <PopupModal
          show={showCreateGroup}
          handleClose={handleCloseCreateGroup}
          handleCreateGroup={handleCreateGroup}
          newGroupName={newGroupName}
          setNewGroupName={setNewGroupName}
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        <GroupsList
          groups={groups}
          handleGroupSelection={handleGroupSelection}
          currentGroup={currentGroup}
        />
      </div>
      <div className="main">
        <div className="toggal"  style={!isMobile ? { display: 'block' } :(toggal ? {display:'block'} : {display:'none'})} >
        <NoteSection
          currentGroup={currentGroup}
          notes={notes}
          inputNote={inputNote}
          setInputNote={setInputNote}
          addNote={addNote}
          handleNoteChange={handleNoteChange}
          isMobile={isMobile}
        />
      </div> 
      </div>
    </div>
  );
};
export default App;
