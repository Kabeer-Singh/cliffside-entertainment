import { React, useEffect, useRef } from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 4px solid #2b61b1;
  border-top: 4px solid #2b61b1;
  margin-top: 17px;
  border-radius: 20px;
  padding: 20px;
  flex-grow: 1; /* Allow it to grow inside RightSideBar */
  overflow: hidden; /* Ensure it doesn’t overflow */
`;

const Text = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #2b61b1;
  flex-shrink: 0; /* Ensure Text does not shrink */
`;

const LogEntry = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const ActionType = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => {
    switch (props.actionType) {
      case "upload":
        return "#4caf50"; // Green for upload
      case "edit":
        return "#ff9800"; // Orange for edit
      case "delete":
        return "#f44336"; // Red for delete
      default:
        return "#000";
    }
  }};
`;

const Timestamp = styled.span`
  color: #888;
  font-size: 12px;
`;

const LogContainer = styled.div`
  flex-grow: 1; /* Take the remaining space in the TitleContainer */
  overflow-y: scroll; /* Add scroll when content overflows */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
`;

const TimestampContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right; /* Ensure the text aligns properly */
`;

const DatePart = styled.span`
  font-size: 12px;
  color: #888;
`;

const TimePart = styled.span`
  font-size: 12px;
  color: #888;
`;

const ActivityLog = ({ activityLog }) => {
  const firstLogRef = useRef(null);

  // Scroll into view when a new activity log is added
  useEffect(() => {
    if (activityLog.length > 0 && firstLogRef.current) {
      firstLogRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activityLog]);

  return (
    <TitleContainer>
      <Text>activity log</Text>
      <LogContainer>
        {activityLog.length > 0 ? (
          activityLog
            .slice()
            .reverse()
            .map((log, index) => (
              <LogEntry
                key={log.id}
                ref={index === 0 ? firstLogRef : null} // Set the ref on the first entry
              >
                <div style={{ fontSize: "10px" }}>
                  <ActionType actionType={log.actionType}>
                    {log.actionType + ":"}<br/>
                  </ActionType>
                  {" " + log.contentValue}
                </div>
                <TimestampContainer>
                  <DatePart>{log.timestamp.split(",")[0]}</DatePart>
                  <TimePart>{log.timestamp.split(",")[1]}</TimePart>
                </TimestampContainer>
              </LogEntry>
            ))
        ) : (
          <p>No recent activities</p>
        )}
      </LogContainer>
    </TitleContainer>
  );
};

export default ActivityLog;
