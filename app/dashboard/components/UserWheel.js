import React from "react";
import styled from "styled-components";

const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 15px;
  border-bottom: 4px solid #ebedef;
`;

const Svg = styled.svg`
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
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
      <Svg width="120" height="120">
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
        {userUploads}/{fileCredits} Upload Credits
      </Text>
    </CircleContainer>
  );
};

export default UserWheel;
