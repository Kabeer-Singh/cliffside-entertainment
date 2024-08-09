// ListItem.js
import React, { useState } from "react";
import styled from "styled-components";

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

const ListItem = ({ file, editingFile, startEditing, saveNewFileName }) => {
  const [newFileName, setNewFileName] = useState(file.fileName);

  return (
      <ListItemContainer key={file.id}>
        <input type="checkbox" onClick={() => deleteFile(file.id)} />
        <ListItemContent>
          <FileIcon src="/icons/file.png" alt="file icon" />
          {editingFile?.id === file.id ? (
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onBlur={() => saveNewFileName(file)}
            />
          ) : (
            <FileName onClick={() => startEditing(file)}>
              {file.fileName}
            </FileName>
          )}
        </ListItemContent>
        <FileDetails>
          {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
        </FileDetails>
        <FileDetails>
          {new Date(file.uploadDateAndTime).toLocaleDateString()}
        </FileDetails>
        <UploadedBy>
          <UploaderPicture src="profile-pic.jpg" alt="uploader" />
          <UploaderName>Uploader Name</UploaderName>
        </UploadedBy>
        <div>
          <button onClick={() => startEditing(file)}>:</button>
        </div>
      </ListItemContainer>
  );
};
export default ListItem;
