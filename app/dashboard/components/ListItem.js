// ListItem.js
import React, { useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { Taviraj } from "next/font/google";
import { Orbitron } from "next/font/google";
const daFont = Orbitron({ subsets: ["latin"], weight: "700" });
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { populateUserMap } from "./userMapService";
import FileShareDropdown from "./FileShareDropdown"; // Assuming you have this component


const ListItemContainer = styled.div`
  // Your styles here
  display: grid;
  grid-template-columns: 1fr 80px 120px 80px 40px;
  gap: 60px;
  max-width: 100%;
  align-items: flex-start;
  justify-content: center;
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
const ListItemContent = styled.div`
  display: flex;
  align-items: center;
`;
const FileIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;
const FileName = styled.span`
  margin: 0;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const FileDetails = styled.span`
  font-size: 12px;
  color: #999;
`;
const UploadedBy = styled.div`
  display: flex;
  align-items: center;
`;
const UploaderPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;
const UploaderName = styled.span`
  font-size: 14px;
  color: #333;
`;

const PopUpCard = styled.div`
  background: white;
  color: #999;
  -webkit-box-shadow: -5px 10px 5px 0px rgba(203, 205, 207, 1);
  -moz-box-shadow: -5px 10px 5px 0px rgba(203, 205, 207, 1);
  box-shadow: -5px 10px 5px 0px rgba(203, 205, 207, 1);
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: center;
`;

const ActionTab = styled.div`
  color: #999;
  font-family: ${daFont.style.fontFamily};
  width: 85px;
  font-size: 12px;
  padding: 8px;
  border-bottom: 2px solid #ebedef;
  cursor: pointer;
  &:hover {
    background: #ebedef;
  }
`;

export const OverflowMenu = () => {
  return (
    <div
      style={{
        width: "12px",
        height: "12px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <span style={dotStyle}></span>
      <span style={{ ...dotStyle, top: "8px" }}></span>
      <span style={{ ...dotStyle, top: "16px" }}></span>
    </div>
  );
};

const dotStyle = {
  display: "block",
  width: "5px",
  height: "5px",
  backgroundColor: "#999",
  borderRadius: "50%",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
};

const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
    ...;
  }
  // use your custom style for ".popup-content"
  &-content {
      all: unset !important;
  color: #ebedef;
  font-size: 12px;
  margin: 6px;
  border-bottom: 2px solid #ebedef;
  }
`;

const ListItem = ({
  file,
  editingFile,
  startEditing,
  saveNewFileName,
  deleteFile,
  addToUserActivityLog,
  map,
}) => {
  const [newFileName, setNewFileName] = useState(file.fileName);
  const userMap = map;

  const handleSave = () => {
    saveNewFileName(newFileName);
  };

  // Function to download file based on downloadURL
  const downloadFile = async (downloadURL) => {
    try {
      // Create a reference to the file in Firebase storage
      const storage = getStorage();
      const fileRef = ref(storage, downloadURL);

      // Await the download URL
      const url = await getDownloadURL(fileRef);

      // Fetch the file from the URL
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a link to download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.fileName; // You can set the default file name here
      link.click(); // Trigger the download

      console.log("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  


  const ToolTip = (props) => {
    const [isSharing, setIsSharing] = useState(false);  // State to manage share popup visibility
    const userMap = props.userMap;
  
    // Function to handle file sharing
    const handleFileShare = async (file) => {
      setIsSharing(true); // Trigger the share popup
  
      // // Populate the user map if it hasn't been done yet
      // if (Object.keys(userMap).length === 0) {
      //   const map = await populateUserMap();
      //   setUserMap(map);
      // }
    };
  
    // Function to log the activity when file is shared
    const logFileShareActivity = (file, sharedWith) => {
      props.addToUserActivityLog('share', props.file, sharedWith)
    };
  
    return (
      <>
        <Popup
          trigger={
            <div>
              <OverflowMenu></OverflowMenu>
            </div>
          }
          position={["left center"]}
          on="click"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          arrow={false}
        >
          <PopUpCard>
            <ActionTab onClick={() => downloadFile(props.file.fileUrl)}>
              Download
            </ActionTab>
            <ActionTab onClick={() => startEditing(props.file)}>
              Edit Name
            </ActionTab>
            <ActionTab onClick={() => deleteFile(props.file.id)}>
              Delete
            </ActionTab>
            <ActionTab
              onClick={() => handleFileShare(props.file)}
            >
              Share File
            </ActionTab>
          </PopUpCard>
        </Popup>
  
        {isSharing && (
          <Popup
            open={isSharing}
            closeOnDocumentClick
            onClose={() => setIsSharing(false)}
          >
            <FileShareDropdown
              file={props.file}
              userMap={userMap}  // Pass the userMap to the dropdown
              onShare={(sharedWith) => {
                logFileShareActivity(props.file, sharedWith);  // Log activity
                setIsSharing(false);  // Close the share popup after sharing
              }}
            />
          </Popup>
        )}
      </>
    );
  };

  return (
    <ListItemContainer key={file.id}>
      <ListItemContent>
        {editingFile?.id === file.id ? (
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onBlur={handleSave} // Trigger save on blur
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave(); // Trigger save on Enter key
              }
            }}
          />
        ) : (
          <FileName onClick={() => startEditing(file)}>
            {file.fileName}
          </FileName>
        )}
      </ListItemContent>
      <FileDetails>{file.fileSize} MB</FileDetails>
      <FileDetails>
        {new Date(file.uploadDateAndTime).toLocaleDateString()}
      </FileDetails>
      <UploadedBy>
        <UploaderName>{userMap[file.userId]}</UploaderName>
      </UploadedBy>
      <ToolTip file={file} addToUserActivityLog={addToUserActivityLog} userMap={userMap}/>
    </ListItemContainer>
  );
};
export default ListItem;
