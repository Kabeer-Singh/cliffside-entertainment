import React, { useState, useEffect } from "react";
import populateUserMap from "./userMapService";
import styled from "styled-components";

// Overlay filter to cover the entire page
const PageFilter = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 999;
`;

// Container for file share options
const Container = styled.div`
  background: red;
  width: 30vw;
  height: 25vh;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

// Dropdown styling
const Dropdown = styled.div`
  position: relative;
  width: 230px; /* Ensuring a consistent width for dropdown */
  
  .dropdown__face,
  .dropdown__items {
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 25px;
    width: 100%; /* Maintain consistent width */
    box-sizing: border-box; /* Prevent overflow */
  }

  .dropdown__face {
    display: block;
    position: relative;
    cursor: pointer;
  }

  .dropdown__items {
    margin: 0;
    position: absolute;
    right: 0;
    top: 100%;
    width: 100%; /* Ensuring dropdown items have the same width */
    list-style: none;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.93, 0.88, 0.1, 0.8);

    &::before {
      content: "";
      background-color: #fff;
      position: absolute;
      bottom: 100%;
      right: 20%;
      height: 40px;
      width: 20px;
    }
  }

  .dropdown__arrow {
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    position: absolute;
    top: 50%;
    right: 30px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg) translateY(-50%);
  }

  input {
    display: none;

    &:checked ~ .dropdown__items {
      top: calc(100% + 25px);
      visibility: visible;
      opacity: 1;
      z-index: 1;
    }
  }
  
  li {
    cursor: pointer;
    padding: 10px 20px;
    background: #f9f9f9;
    border-radius: 10px;
    margin: 5px 0;
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const StyledLabel = styled.label`
  color: #2b61b1;
  font-size: 16px;
  text-transform: uppercase;
`;

const FileShareDropdown = ({ file, onShare }) => {
  const [userMap, setUserMap] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserMap = async () => {
      const map = await populateUserMap();
      setUserMap(map);
    };
    fetchUserMap();
  }, []);

  const handleShare = () => {
    if (selectedUserId) {
      onShare(selectedUserId);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setDropdownOpen(false); // Close the dropdown
  };

  return (
    <PageFilter>
      <Container>
        <StyledLabel htmlFor="dropdown">
          Share <span style={{ textDecoration: "underline" }}>{file.fileName}</span> with:
        </StyledLabel>

        <Dropdown>
          <input
            type="checkbox"
            id="dropdown"
            checked={isDropdownOpen}
            onChange={() => setDropdownOpen(!isDropdownOpen)}
          />

          <label className="dropdown__face" htmlFor="dropdown">
            <div className="dropdown__text">
              {selectedUserId ? userMap[selectedUserId] : "Select a user"}
            </div>
            <div className="dropdown__arrow"></div>
          </label>

          <ul className="dropdown__items">
            {Object.keys(userMap).map((userId) => (
              <li key={userId} onClick={() => handleUserSelect(userId)}>
                {userMap[userId]}
              </li>
            ))}
          </ul>
        </Dropdown>

        <button onClick={handleShare} disabled={!selectedUserId}>
          Share
        </button>
      </Container>
    </PageFilter>
  );
};

export default FileShareDropdown;
