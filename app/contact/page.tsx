"use client";
import Image from "next/image";
import s from "styled-components";
import NavBar from "../../components/navigation";
import React, { useRef, useEffect, useState } from "react";
import { Yaldevi } from "next/font/google";
import { Form } from "../../components/form";

const TitleFont = Yaldevi({ subsets: ["latin"], weight: "600" });

// Define props interface with isActive prop
interface FormTitleProps {
  isActive: boolean;
}

const PageContainer = s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  background-color: #71B1CD;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin-top: 50px;
  @media (max-width: 1000px) {
    margin-top: 0px;
  }
`;

const InfoContainer = s.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  @media (min-width: 1000px) {
    flex-direction: row;
    
  }
    @media (max-width: 768px) {
    margin-top: 70px;

    }
`;

const Column1 = s.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  width: 100%;
  min-height: 100%;
  background: #00063F;
  padding-top: 10vh;
  padding-left: 5vw;
  padding-right: 5vw;
  box-sizing: border-box;
  @media (min-width: 1000px) {
    display: block;
    flex: 1;
    overflow: auto;
  }
  @media (max-width: 1000px) {
    padding-right: 0;
    padding-top: 2vh;
    padding-left: 2vw;
    text-align: left;
  }
`;

const Column2 = s.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  width: 100%;
  min-height: 100%;
  background: #71B1CD;
  padding-top: 10vh;
  padding-left: 5vw;
  padding-right: 5vw;
  box-sizing: border-box;
  @media (min-width: 1000px) {
    display: block;
    flex: 1;
    overflow: scroll;
  }
    @media (max-width: 1000px) {
    padding-top: 5vh;
    }
`;

const ToggleButton = s.button`
  display: block;
  margin: 1em;
  @media (min-width: 1000px) {
    display: none;
  }
`;

const FormTitle = s.div<FormTitleProps>`
  font-family: ${TitleFont.style.fontFamily};
  font-size: 3em;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 2vh;
  position: relative;
  color: ${(props) => (props.isActive ? "#FFF" : "#B3B3B3")};
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.isActive &&
    `
    &::before {
      content: '';
      position: absolute;
      left: -45px;
      top: 50%;
      transform: translateY(-50%);
      width: 25px;
      height: 25px;
      margin-right: 25px;
      background-color: #fff;
      border-radius: 50%;
      z-index: 1;
      opacity: 1;
      transition: opacity 2s ease-in;
    }
  `}

  @media (max-width: 1000px) {
    font-size: 24px;
    border-bottom: 2px solid ${(props) =>
      props.isActive ? "#FFF" : "#B3B3B3"};
    font-style: normal;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      color: #FFF;
    }
  }
    @media (max-width: 1600px){
      font-size: 2em;
    }
  @media (max-width: 672px) {
      font-size: 1.5em;
  }

`;

const HiddenTitleContainer = s.div`
  color: #FFF;
  font-family: ${TitleFont.style.fontFamily};
  font-size: 64px;
  padding-bottom: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 17.36px;
  align-self: center;
  margin-bottom: 40vh;
  @media (min-width: 1000px) {
    display: none;
  }
  @media (max-width: 600px) {
    margin-bottom: 18vh;
    padding-bottom: 0;
    font-size: 32px;
    letter-spacing: 10.36px;
  }
`;

const StyledButton = s.button`
@media (min-width: 1000px) {
    display: none;
  }
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #34495e;
  color: #ffffff;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 25px;

  &:hover {
    background-color: #2c3e50;
  }

  &:focus {
    outline: none;
  }
        @media (max-width: 600px) {
    font-size: .75em;
    }
`;

export default function Home() {
  const [selectedForm, setSelectedForm] = useState("GENERAL REQUEST");
  const [isColumnOneVisible, setIsColumnOneVisible] = useState(true);

  const handleSelectionChange = (option: string) => {
    setSelectedForm(option);
    setIsColumnOneVisible(false);
  };

  return (
    <PageContainer>
      <NavBar />
      <InfoContainer>
        <Column1 isVisible={isColumnOneVisible}>
          <HiddenTitleContainer>(CONTACT US)</HiddenTitleContainer>
          <FormTitle
            isActive={selectedForm === "GENERAL REQUEST"}
            onClick={() => handleSelectionChange("GENERAL REQUEST")}
          >
            GENERAL REQUEST
          </FormTitle>
          <FormTitle
            isActive={selectedForm === "SUBMIT MUSIC"}
            onClick={() => handleSelectionChange("SUBMIT MUSIC")}
          >
            SUBMIT MUSIC
          </FormTitle>
          <FormTitle
            isActive={selectedForm === "SYNCH LICENSE REQUEST"}
            onClick={() => handleSelectionChange("SYNCH LICENSE REQUEST")}
          >
            SYNCH LICENSE REQUEST
          </FormTitle>
          <FormTitle
            isActive={selectedForm === "PRESS CONTACT"}
            onClick={() => handleSelectionChange("PRESS CONTACT")}
          >
            PRESS CONTACT
          </FormTitle>
        </Column1>
        <Column2 isVisible={!isColumnOneVisible}>
          <StyledButton onClick={() => setIsColumnOneVisible(true)}>
            Back to Selection
          </StyledButton>
          {selectedForm === "GENERAL REQUEST" && (
            <Form inputTitle="LET US KNOW ABOUT ANY GENERAL INQUIRIES." />
          )}
          {selectedForm === "SUBMIT MUSIC" && (
            <Form
              submitMusic={true}
              inputTitle="WE RECEIVE A LOT OF SUBMISSIONS. PLEASE ALLOW UP TO 1 WEEK FOR A RESPONSE. THANKS!"
            />
          )}
          {selectedForm === "SYNCH LICENSE REQUEST" && (
            <Form inputTitle="PLEASE INCLUDE AS MUCH INFORMATION AS POSSIBLE ABOUT THE REQUEST AND WE WILL REPLY AS QUICKLY AS POSSIBLE." />
          )}
          {selectedForm === "PRESS CONTACT" && (
            <Form inputTitle="PLEASE INCLUDE AS MUCH DETAIL AS POSSIBLE IN YOUR REQUESTS." />
          )}
        </Column2>
      </InfoContainer>
    </PageContainer>
  );
}
