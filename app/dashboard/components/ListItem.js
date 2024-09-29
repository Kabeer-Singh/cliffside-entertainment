// ListItem.js
import React, { useState, useEffect, useRef } from "react";
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

// Styled components
const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 80px 120px 80px 40px;
  gap: 60px;
  max-width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding-left: 45px;
  padding-right: 30px;
  padding-bottom: 15px;
  padding-top: 15px;
  border-radius: 20px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const PlayPauseButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  &.play {
    border-left: 15px solid #2b61b1;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 0px solid transparent;
    width: 0;
    height: 0;
  }

  &.pause {
    display: flex;
    justify-content: space-between;
    width: 15px;
    height: 20px;
  }

  &.pause div {
    width: 5px;
    height: 100%;
    background-color: #2b61b1;
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

const ListItem = ({
  file,
  editingFile,
  startEditing,
  saveNewFileName,
  deleteFile,
  addToUserActivityLog,
  map,
  isPlaying,
  currentFileId,
  handlePlayPause,
}) => {
  const [newFileName, setNewFileName] = useState(file.fileName);
  const [audioUrl, setAudioUrl] = useState(null); // Store the audio URL once retrieved
  const audioRef = useRef(null); // Reference to the audio element
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
    const [isSharing, setIsSharing] = useState(false); // State to manage share popup visibility
    const userMap = props.userMap; // Assuming userMap is passed as a prop
    const [isOpen, setIsOpen] = useState(false);

    // Function to handle file sharing
    const handleFileShare = async (file) => {
      setIsSharing(true); // Trigger the share popup
    };

    // Function to log the activity when a file is shared
    const logFileShareActivity = (file, sharedWith) => {
      props.addToUserActivityLog("share", props.file, sharedWith);
    };

    return (
      <>
        {!isSharing ? (
          <Popup
            open={isOpen}
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
              <ActionTab
                onClick={() => {
                  setIsOpen(false);
                  downloadFile(props.file.fileUrl);
                }}
              >
                Download
              </ActionTab>
              <ActionTab
                onClick={() => {
                  setIsOpen(false);
                  startEditing(props.file);
                }}
              >
                Edit Name
              </ActionTab>
              <ActionTab
                onClick={() => {
                  setIsOpen(false);
                  deleteFile(props.file.id);
                }}
              >
                Delete
              </ActionTab>
              <ActionTab
                onClick={() => {
                  setIsOpen(false);
                  handleFileShare(props.file);
                }}
              >
                Share File
              </ActionTab>
            </PopUpCard>
          </Popup>
        ) : (
          <FileShareDropdown
            file={props.file}
            setIsSharing={setIsSharing}
            onShare={(sharedWith) => {
              logFileShareActivity(props.file, sharedWith); // Log the share activity
              setIsSharing(false); // Close the share popup after sharing
            }}
          />
        )}
      </>
    );
  };

  // Fetch the download URL and set up the audio element
  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const storage = getStorage();
        const fileRef = ref(storage, file.fileUrl);
        const url = await getDownloadURL(fileRef);
        setAudioUrl(url); // Set the audio URL once retrieved
        audioRef.current = new Audio(url); // Initialize the audio object
      } catch (error) {
        console.error("Error fetching the audio file:", error);
      }
    };

    fetchAudioUrl();
  }, [file.fileUrl]);

  useEffect(() => {
    // If the current file is not the playing one, stop the audio
    if (currentFileId !== file.id && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentFileId, file.id]);

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    handlePlayPause(file.id); // Inform the parent which file is being played
  };

  return (
    <ListItemContainer key={file.id}>
      {/* Audio play/pause button */}
      <PlayPauseButton
        onClick={togglePlayPause}
        className={isPlaying ? "pause" : "play"}
      >
        {isPlaying ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : null}
      </PlayPauseButton>
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
      <ToolTip
        file={file}
        addToUserActivityLog={addToUserActivityLog}
        userMap={userMap}
      />
    </ListItemContainer>
  );
};
export default ListItem;
