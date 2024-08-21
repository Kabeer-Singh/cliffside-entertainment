// FileListHeader.js
import { Taviraj } from "next/font/google";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 99%;
  background: white;
  border-radius: 20px;
  border: 2px solid #ebedef;
  margin-bottom: 20px;
  z-index: 100;
  position: sticky;
`;

const TabAndSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  max-width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 2px solid #ebedef;
`;

const TabContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const Tab = styled.div`
  font-size: 12px;
  margin-right: 30px;
  color: ${(props) => (props.active ? "#389afe" : "#999;")};
  background: ${(props) => (props.active ? "#ddebfa" : "white")};
  align-text: center;
  padding: 15px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }

`;

const SearchBar = styled.input`
  background-color: #ebedef;
  border: none !important;
  width: 30%;
  height: 30px;
  border-radius: 20px;
  padding: 0px 15px;
`;

const ListItemContainer = styled.div`
  // Your styles here
  display: grid;
  grid-template-columns: 30px 1fr 80px 120px 80px 40px;
  gap: 60px;
  max-width: 100%;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 15px;
  padding-top: 15px;
  border-radius: 20px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const FileDetails = styled.span`
  font-size: 12px;
  color: #999;
`;

const FileListHeader = ({
  fileTab,
  handleSort,
  handleSearch,
  handleFileTabChange,
}) => (
  <Container>
    <TabAndSearchContainer>
      <TabContainer>
        <Tab
          active={fileTab === "All"}
          onClick={() => handleFileTabChange("All")}
        >
          View all
        </Tab>
        <Tab
          active={fileTab === "Uploads"}
          onClick={() => handleFileTabChange("Uploads")}
        >
          Your files
        </Tab>
        <Tab
          active={fileTab === "Shared"}
          onClick={() => handleFileTabChange("Shared")}
        >
          Shared files
        </Tab>
      </TabContainer>
      <SearchBar
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </TabAndSearchContainer>
    <ListItemContainer>
      <FileDetails>Select</FileDetails>
      <FileDetails>File Name</FileDetails>
      <FileDetails>File Size</FileDetails>
      <FileDetails>Last Uploaded</FileDetails>
      <FileDetails>Author</FileDetails>
      <FileDetails>Edit</FileDetails>
    </ListItemContainer>
  </Container>
);

export default FileListHeader;
