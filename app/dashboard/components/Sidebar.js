// Sidebar.js
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Orbitron } from "next/font/google";
const daFont = Orbitron({ subsets: ["latin"], weight: "700" });

const SidebarContainer = styled.aside`
  grid-column: 1/2;
  grid-row: 1/3;
  /* margin: 30px 30px; */
  display: flex;
  flex-direction: column;
  align-items: left;
  /* border-radius: 20px; */
  background: #f5f6f9;
  padding: 20px;
`;
const ProfilePicture = styled.img`
  width: 175px;
  height: 175px;
  margin-top: 8px;
  border-radius: 20px;
  align-self: center;
  margin-bottom: 8px;
`;
const WelcomeText = styled.p`
  margin: 0 !important;
  text-align: center;
  font-family: ${daFont.style.fontFamily};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: var(
    --backgroundGradient2,
    linear-gradient(180deg, #142e54 0%, #2c66ba 100%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Username = styled.p`
  margin: 0 !important;
  margin-top: -5px !important;
  margin-bottom: 45px !important;
  text-align: center;
  font-family: ${daFont.style.fontFamily};
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: var(
    --backgroundGradient2,
    linear-gradient(180deg, #142e54 0%, #2c66ba 100%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Menu = styled.nav`
  width: 100%;
  ul {
    padding-inline-start: 0; /* Remove default padding */
    list-style-type: none; /* Remove default list style */
    padding: 0; /* Ensure no padding on all sides */
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;
const MenuItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 12px;
  cursor: pointer;
  color: #b3b3b3;
  list-style: none;
  border-radius: 20px;
  background-color: ${(props) => (props.isActive ? "#71B1CD" : "none")};
  ${(props) =>
    props.isActive &&
    css`
      color: #2B61B1;;
      background: #ddebfa;
    `}
  &:hover {
    color: #2B61B1;;
    background: #ddebfa;
  }
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 15px;
  margin-left: 15px;
  align-self: flex-start;
`;
const MenuTitle = styled.li`
  padding: 5%;
  font-size: 34px;
  text-align: left;
  color: #71b1cd;
  list-style: none;
  text-decoration: underline;
`;
const NotificationMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MenuItem
      isActive={isActive}
      onClick={() => setActiveTab("Notifications")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={
          isActive || isHovered
            ? "/activeIcons/notificationActive.png"
            : "/nonActiveIcons/notification.png"
        }
        alt="icon"
      />
      Notification Center
    </MenuItem>
  );
};
const ContractMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MenuItem
      isActive={isActive}
      onClick={() => setActiveTab("Contracts")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={
          isActive || isHovered
            ? "/activeIcons/contractActive.png"
            : "/nonActiveIcons/contract.png"
        }
        alt="icon"
      />
      Contracts
    </MenuItem>
  );
};
const ProfileMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MenuItem
      isActive={isActive}
      onClick={() => setActiveTab("Profile")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={
          isActive || isHovered
            ? "/activeIcons/profileActive.png"
            : "/nonActiveIcons/profile.png"
        }
        alt="icon"
      />
      Edit Profile
    </MenuItem>
  );
};
const UploadMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MenuItem
      isActive={isActive}
      onClick={() => setActiveTab("File Management")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={
          isActive || isHovered
            ? "/activeIcons/uploadActive.png"
            : "/nonActiveIcons/upload.png"
        }
        alt="icon"
      />
      File Management
    </MenuItem>
  );
};
const SharedMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MenuItem
      isActive={isActive}
      onClick={() => setActiveTab("Shared")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={
          isActive || isHovered
            ? "/activeIcons/sharedActive.png"
            : "/nonActiveIcons/shared.png"
        }
        alt="icon"
      />
      Shared
    </MenuItem>
  );
};

const Sidebar = ({ activeTab, setActiveTab, profilePic, userName }) => (
  <SidebarContainer>
    <ProfilePicture src={profilePic} alt="Profile Picture" />
    <WelcomeText>WELCOME BACK</WelcomeText>
    <Username>{userName}</Username>
    <Menu>
      <ul>
        <NotificationMenuItem
          isActive={activeTab === "Notifications"}
          setActiveTab={setActiveTab}
        />
        <UploadMenuItem
          isActive={activeTab === "File Management"}
          setActiveTab={setActiveTab}
        />
        <ContractMenuItem
          isActive={activeTab === "Contracts"}
          setActiveTab={setActiveTab}
        />
        <ProfileMenuItem
          isActive={activeTab === "Profile"}
          setActiveTab={setActiveTab}
        />
      </ul>
    </Menu>
  </SidebarContainer>
);

export default Sidebar;
