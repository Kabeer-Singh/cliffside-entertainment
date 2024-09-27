import React, { forwardRef, useCallback, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Popup from "reactjs-popup";
import { OverflowMenu } from "./ListItem";
import { Orbitron } from "next/font/google";
const daFont = Orbitron({ subsets: ["latin"], weight: "700" });

const DropzoneContainer = styled.div<{ fileSelectionOccured: boolean }>`
  border: ${({ fileSelectionOccured }) =>
    fileSelectionOccured ? "2px dashed #2B61B1" : "2px dashed #2B61B1"};
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: ${({ fileSelectionOccured }) =>
    fileSelectionOccured ? "center" : "center"};
  justify-content: ${({ fileSelectionOccured }) =>
    fileSelectionOccured ? "center" : "center"};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  transition: width 0.2s ease-in-out;
  width: ${({ progress }) => progress}%;
  background-color: #1e90ff;
  position: absolute;
  bottom: 0;
  left: 5%;
  border-radius: 20px;
  max-width: 90%;
`;

const FileItem = styled.div`
  margin: 0px 2px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  z-index: 100;
  position: relative;
  &:hover {
    box-shadow: -5px -5px 20px rgba(247, 212, 251, 0.4),
      5px 5px 20px rgba(213, 218, 252, 0.4);
  }
`;

const FileIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 10px;
`;

const FileDetails = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
`;

const FileName = styled.p`
  font-weight: 500;
  white-space: nowrap;
  margin: 0;
  font-size: 14px;
`;

const FileSize = styled.p`
  font-size: 10px;
  color: #777;
  white-space: nowrap;
  margin: 0;
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  color: #2b61b1;
  cursor: pointer;
`;

const SuccessMessage = styled.p`
  color: green;
  align-self: flex-end;
`;

const ErrorMessage = styled.p`
  color: red;
  justify-self: flex-end;
`;
const CancelButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
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

interface RightSidebarProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: (file: File) => void;
  handleUploadAll: () => void;
  progresses: number[];
  successMessage: string;
  selectedFiles: File[];
  fileCredits: number;
  userUploads: number;
  handleRemoveFile: (file: File) => void;
}

const FileUploader = forwardRef<HTMLDivElement, RightSidebarProps>(
  function RightSidebar(props, ref) {
    const {
      handleFileChange,
      handleUpload,
      handleUploadAll,
      progresses,
      successMessage,
      selectedFiles,
      fileCredits,
      userUploads,
      handleRemoveFile,
    } = props;

    const [errorMessage, setErrorMessage] = useState("");
    const fileUploadsAvailable = fileCredits - userUploads;


    const fileValidator = (file: File) => {
      const maxFiles = fileUploadsAvailable;
      const allowedTypes = ["audio/mpeg", "audio/wav"];
      const maxSize = 60 * 1024 * 1024; // 60MB
      const maxFileNameLength = 35;

      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        return {
          code: "invalid-file-type",
          message: `Invalid file type: ${file.name}. Only .mp3 and .wav files are allowed.`,
        };
      }

      // Validate file size
      if (file.size > maxSize) {
        return {
          code: "file-too-large",
          message: `File size exceeds 60MB: ${file.name}.`,
        };
      }

      // Validate file name length
      if (file.name.length > maxFileNameLength) {
        return {
          code: "file-name-too-long",
          message: `File name exceeds ${maxFileNameLength} characters: ${file.name}.`,
        };
      }

      // If all validations pass, return null (no errors)
      return null;
    };

    const onDrop = useCallback(
      (acceptedFiles: File[], fileRejections: any[]) => {
        // Check if too many files are uploaded
        const maxFiles = fileUploadsAvailable;

        // Validate the total number of files (acceptedFiles + current uploads)
        if (acceptedFiles.length > maxFiles) {
          setErrorMessage(`You can only upload up to ${maxFiles} files.`);
          setTimeout(() => setErrorMessage(""), 1500);
          return;
        }

        // If any file rejections happen (due to size, type, etc.)
        if (fileRejections.length > 0) {
          const rejection = fileRejections[0].errors[0];
          setErrorMessage(rejection.message);
          setTimeout(() => setErrorMessage(""), 1500);
          return;
        }

        // Process accepted files if everything is valid
        const dataTransfer = new DataTransfer();
        acceptedFiles.forEach((file) => {
          dataTransfer.items.add(file);
        });

        const input = document.createElement("input");
        input.type = "file";
        input.files = dataTransfer.files;

        const event = new Event("change", { bubbles: true });
        Object.defineProperty(event, "target", {
          writable: false,
          value: input,
        });

        handleFileChange(
          event as unknown as React.ChangeEvent<HTMLInputElement>
        );
      },
      [handleFileChange, fileUploadsAvailable] // Add `fileUploadsAvailable` as a dependency
    );

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: true,
      maxFiles: fileUploadsAvailable,
      accept: {
        "audio/mpeg": [".mp3"],
        "audio/wav": [".wav"],
      },
      maxSize: 60 * 1024 * 1024, // 60MB
      validator: fileValidator,
    });

    const fileSelectionOccured = selectedFiles.length !== 0;

    return (
      <DropzoneContainer
        fileSelectionOccured={fileSelectionOccured}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <>
          <div style={{ marginBlock: "4px" }}>
            Click to Upload or Drag'N'Drop
          </div>
          <div>Files must be .mp3 .wav - Max 60Mb</div>
          <div>Credits Available: {fileUploadsAvailable}</div>
        </>

        {selectedFiles.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUploadAll();
            }}
            style={{
              position: "absolute",

              right: "0",
              bottom: "60px",
            }}
          >
            Upload All
          </button>
        )}
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            alignSelf: "flex-start",
            justifySelf: "center",
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "2px",
            overflow: "scroll",
            scrollbarColor: '#2B61B1 white',
            scrollbarWidth: 'thin',
            width: "100%",
          }}
        >
          {selectedFiles.map((file: any, index: any) => (
            <FileItem key={file.id}>
              <FileDetails>
                <FileName>{file.name}</FileName>
                <FileSize>
                  {Math.round(progresses[file.id])}% |{" "}
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </FileSize>
              </FileDetails>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  marginLeft: "10px",
                }}
              >
                <MoreOptionsButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpload(file);
                  }}
                >
                  Upload
                </MoreOptionsButton>
                <CancelButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(file);
                  }}
                >
                  Cancel
                </CancelButton>
              </div>
              <ProgressBar progress={progresses[file.id] || 0} />
            </FileItem>
          ))}
        </div>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </DropzoneContainer>
    );
  }
);

export default FileUploader;
