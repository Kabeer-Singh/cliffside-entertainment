import { React, useEffect } from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-bottom: 4px solid #2b61b1;
  border-top: 4px solid #2b61b1;
  margin-top: 17px;
  border-radius: 20px;
`;
const Text = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
  color: #2b61b1;
`;

const ActivityLog = ({ activityLog }) => {
  return (
    <TitleContainer>
      <Text>activity log</Text>
    </TitleContainer>
  );
};
export default ActivityLog;
