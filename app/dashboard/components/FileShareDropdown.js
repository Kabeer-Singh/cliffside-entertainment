import React, { useState, useEffect } from "react";
import populateUserMap from "./userMapService";
import styled from "styled-components";
import { Orbitron } from "next/font/google";
const daFont = Orbitron({ subsets: ["latin"], weight: "700" });
import { auth } from "@/components/firebase";

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
  background: linear-gradient(140deg, #e2e2e2, #cdcdcd);
  width: 20vw;
  height: 40vh;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-family: ${daFont.style.fontFamily};
`;

// Dropdown styling
const Dropdown = styled.div`
  position: relative;
  width: 230px;

  .dropdown__face,
  .dropdown__items {
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 25px;
    width: 100%;
    box-sizing: border-box;
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
    width: 100%;
    list-style: none;
    max-height: 20vh;
    overflow-y: scroll;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
    background: white;
    border-radius: 25px;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
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
      visibility: visible;
      opacity: 1;
      transform: translateY(0); /* Moves the dropdown smoothly into view */
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
  color: #FCFCFC;
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 2vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 25vh;
  font-family: ${daFont.style.fontFamily};
`;

const ShareButton = styled.button`
  width: 7vw;
  height: 5vh;
  border: none;
  border-radius: 20px;
  background: #2b61b1;
  margin-left: 3vw;
  font-size: 15px;
  text-transform: uppercase;
  font-family: ${daFont.style.fontFamily};
  color: white;
  cursor: pointer;
  &:disabled {
    background: #608ed1;
    cursor: auto;
  }
`;

const CancelButton = styled.button`
  width: 7vw;
  height: 5vh;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: ${daFont.style.fontFamily};
  color: white;
  cursor: pointer;
  &:hover {
    background: #918d8d;
  }
`;

const FileShareDropdown = ({ file, setIsSharing, onShare }) => {
  const [userMap, setUserMap] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUserMap = async () => {
      const map = await populateUserMap();
      // Filter out the current user's UID from the map
      const filteredMap = Object.fromEntries(
        Object.entries(map).filter(([userId]) => userId !== auth.currentUser.uid)
      );
      setUserMap(filteredMap);
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
    setDropdownOpen(false); // Close the dropdown when a user is selected
  };

  const handleCancel = () => {
    setIsSharing(false);
  };

  return (
    <PageFilter>
      <Container>
        <StyledLabel htmlFor="dropdown">
          Share <span style={{ color: "#2b61b1" }}>{file.fileName}</span> with:
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

          {/* Scrollable dropdown items with animations */}
          <ul className="dropdown__items">
            {Object.keys(userMap).map((userId) => (
              <li key={userId} onClick={() => handleUserSelect(userId)}>
                {userMap[userId]}
              </li>
            ))}
          </ul>
        </Dropdown>
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <ShareButton onClick={handleShare} disabled={!selectedUserId}>
            Share
          </ShareButton>
        </ButtonContainer>
      </Container>
    </PageFilter>
  );
};

export default FileShareDropdown;
