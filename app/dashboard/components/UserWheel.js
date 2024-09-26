import React from "react";
import styled from "styled-components";

const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  border-bottom: 4px solid #e6e6e6;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const Svg = styled.svg`
  width: 60%; /* Take up 80% of the container's width */
  height: auto; /* Maintain aspect ratio */
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: -5px;
  text-align: center;  
`;

const UserWheel = ({ fileCredits, userUploads }) => {
  const radius = 45; // Radius of the circle
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (userUploads / fileCredits) * 100; // Calculate progress percentage
  const offset = circumference - (progress / 100) * circumference;

  return (
    <CircleContainer>
      <Svg viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e6e6e6" // gray background
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#2B61B1" // blue representing progress
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)" // Rotate only the circle around its center
        />
        {/* Percentage Text */}
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#2B61B1"
          fontSize="18px"
          fontWeight="bold"
        >
          {Math.round(progress)}%
        </text>
      </Svg>
      <Text>
        Upload Credits Usage
      </Text>
    </CircleContainer>
  );
};

export default UserWheel;
