import React, { useState, useEffect } from "react";
import populateUserMap from "./userMapService";

const FileShareDropdown = ({ onShare }) => {
  const [userMap, setUserMap] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const fetchUserMap = async () => {
      const map = await populateUserMap();
      setUserMap(map); // Set the userMap state
    };
    fetchUserMap();
  }, []);

  const handleShare = () => {
    if (selectedUserId) {
      onShare(selectedUserId); // Pass the selected userId to the onShare function
    }
  };

  return (
    <div>
      <label htmlFor="userDropdown">Share with: </label>
      <select
        id="userDropdown"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="" disabled>
          Select a user
        </option>
        {Object.keys(userMap).map((userId) => (
          <option key={userId} value={userId}>
            {userMap[userId]} {/* Display userName */}
          </option>
        ))}
      </select>
      <button onClick={handleShare} disabled={!selectedUserId}>
        Share
      </button>
    </div>
  );
};

export default FileShareDropdown;
