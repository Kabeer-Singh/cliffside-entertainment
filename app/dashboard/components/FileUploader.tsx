import React, { forwardRef, useCallback, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

const RightSidebarContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DropzoneContainer = styled.div<{ fileSelectionOccured: boolean }>`
  border: ${({ fileSelectionOccured }) =>
    fileSelectionOccured ? "none" : "2px dashed #2B61B1"};
  border-radius: 20px;
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
  align-self: flex-end;
`;

const ErrorMessage = styled.p`
  color: red;
  align-self: flex-end;
`;

interface RightSidebarProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: (file: File) => void;
  handleUploadAll: () => void;
  progresses: number[];
  successMessage: string;
  selectedFiles: File[];
}

const fileValidator = (file: File) => {
  const maxFiles = 5;
  const allowedTypes = ["audio/mpeg", "audio/wav"];
  const maxSize = 60 * 1024 * 1024; // 60MB
  const maxFileNameLength = 20;

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

const FileUploader = forwardRef<HTMLDivElement, RightSidebarProps>(
  function RightSidebar(props, ref) {
    const {
      handleFileChange,
      handleUpload,
      handleUploadAll,
      progresses,
      successMessage,
      selectedFiles,
    } = props;
    const [errorMessage, setErrorMessage] = useState("");
    
    const onDrop = useCallback(
      (acceptedFiles: File[], fileRejections: any[]) => {
        if (fileRejections.length > 0) {
          const rejection = fileRejections[0].errors[0];
          setErrorMessage(rejection.message);
          setTimeout(() => setErrorMessage(""), 3000);
          return;
        }

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

        handleFileChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
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
      validator: fileValidator
    });

    const fileSelectionOccured = selectedFiles.length !== 0;

    return (
      <RightSidebarContainer>
        <DropzoneContainer
          fileSelectionOccured={fileSelectionOccured}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {!fileSelectionOccured && (
            <>
              <div style={{marginBlock: '4px'}}>Click to Upload or Drag'N'Drop</div>
              <div>Files must be .mp3 .wav - Max 60Mb</div>
            </>
          )}

          {selectedFiles.length > 1 && (
            <button onClick={(e) => {e.stopPropagation(); handleUploadAll();}}>Upload All</button>
          )}

          {selectedFiles.map((file: any, index: any) => (
            <FileItem key={file.id}>
              <FileIcon src="/icons/file-icon.png" alt="file icon" />
              <FileDetails>
                <FileName>{file.name}</FileName>
                <FileSize>
                  {Math.round(progresses[file.id])}% |{" "}
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </FileSize>
                <ProgressBar progress={progresses[file.id] || 0} />
              </FileDetails>
              <MoreOptionsButton onClick={(e) => { e.stopPropagation(); handleUpload(file)} }>
                Upload
              </MoreOptionsButton>
            </FileItem>
          ))}

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </DropzoneContainer>
      </RightSidebarContainer>
    );



    
  }
);

export default FileUploader;
