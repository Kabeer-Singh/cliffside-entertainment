// RightSidebar.js
import React, { forwardRef, useRef, useState } from "react";
import styled from "styled-components";

const RightSidebarContainer = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  margin-top: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
`;
const ProgressBar = styled.div`
  height: 10px; /* Set a fixed height for the progress bar */
  transition: width 0.2s ease-in-out;
  width: ${(props) => props.progress}%;
  background-color: #1e90ff;
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
    progress,
    successMessage,
    errorMessage,
  } = props;
  return (
    <RightSidebarContainer>
      <input type="file" onChange={handleFileChange} ref={ref} />
      <button onClick={handleUpload}>Upload</button>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      <span>{Math.round(progress)}%</span>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RightSidebarContainer>
  );
});

export default RightSidebar;
