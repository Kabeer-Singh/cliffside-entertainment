import React, { forwardRef, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

const RightSidebarContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DropzoneContainer = styled.div<{ fileSelectionOccured: boolean }>`
  border: ${({ fileSelectionOccured }) => (fileSelectionOccured ? 'none' : '2px dashed #389afe')};
  text-align: center;
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 4px; /* Set a fixed height for the progress bar */
  transition: width 0.2s ease-in-out;
  width: ${({ progress }) => progress}%;
  background-color: #1e90ff;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 10%;
`;

const FileIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 10px;
`;

const FileDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const FileName = styled.p`
  font-weight: 500;
  margin: 0;
`;

const FileSize = styled.p`
  font-size: 12px;
  color: #777;
  margin: 0;
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 18px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const RightSidebar = forwardRef(function RightSidebar(props, ref) {
  const {
    handleFileChange,
    handleUpload,
    handleUploadAll,
    progresses,
    successMessage,
    errorMessage,
    selectedFiles,
  } = props;

  const onDrop = useCallback(
    (acceptedFiles) => {
      handleFileChange({ target: { files: acceptedFiles } });
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 5,
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
    },
    maxSize: 60 * 1024 * 1024, // 60MB
  });

  const fileSelectionOccured = selectedFiles.length !== 0;

  return (
    <RightSidebarContainer>
      <DropzoneContainer fileSelectionOccured={fileSelectionOccured} {...getRootProps()}>
        <input {...getInputProps()} />
        {!fileSelectionOccured && 
          <>
            <div>Click to Upload or Drag'N'Drop</div>
            <div>Files must be .mp3 .wav - 60MB max</div>
          </>
        }
      

      {selectedFiles.length > 1 && (
        <button onClick={handleUploadAll}>Upload All</button>
      )}

      {selectedFiles.map((file: any, index: any) => (
        <FileItem key={index}>
          <FileIcon src="/icons/file-icon.png" alt="file icon" />
          <FileDetails>
            <FileName>{file.name}</FileName>
            <FileSize>
              {Math.round(progresses[index])}% | {(file.size / (1024 * 1024)).toFixed(2)} MB
            </FileSize>
            <ProgressBar progress={progresses[index]} />
          </FileDetails>
          <MoreOptionsButton onClick={() => handleUpload(file, index)}>
            Upload
          </MoreOptionsButton>
        </FileItem>
      ))}

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </DropzoneContainer>
    </RightSidebarContainer>
  );
});

export default RightSidebar;
