"use client";
import NavBar from "../components/navigation";
import React, { useRef, useEffect, useState, useCallback } from "react";
import s from "styled-components";
import logo from "../public/logos/mockUpLogo.png";
import {
  PageContainer,
  InfoContainer,
  Title,
  TitleContainer,
  TitleContainerSecond,
  LeftColumn,
  Logo,
  RightColumn,
  Slogan,
  Button,
} from "../components/styled-components";
import { Oswald } from "next/font/google";
import { Rubik } from "next/font/google";
import VideoPlayer from "../components/VideoPlayer";
const Bold = Oswald({ subsets: ["latin"], weight: "700" });
const Medium = Oswald({ subsets: ["latin"], weight: "500" });
const Regular = Oswald({ subsets: ["latin"], weight: "400" });
const Light = Oswald({ subsets: ["latin"], weight: "300" });
const ExtraLight = Oswald({ subsets: ["latin"], weight: "200" });
const Parantheses = Rubik({ subsets: ["latin"], weight: "300" });

const SloganContainer = s.div`
color: #FFF;
text-align: center;
font-family: ${ExtraLight.style.fontFamily};
font-size: 255px;
font-style: normal;
font-weight: 200;
line-height: normal;
letter-spacing: normal;
display: flex;
flex-flow: row nowrap;
@media (max-width: 768px) {
    font-size: 125px;
    padding-bottom: 35px;
    font-family: ${Parantheses.style.fontFamily};
}
`;
const PageContainerEdited = s.div`
  flex-flow: column nowrap;
      display: flex;
    align-items: center;
    justify-content: center;
    background: var(--backgroundGradient2);
    width: 100%; /* Take up the entire width of the viewport */
    height: 100%; /* Take up the entire height of the viewport */
    min-width: 100vw; /* Ensure container expands if content exceeds viewport width */
    min-height: 93vh; /* Ensure container expands if content exceeds viewport height */
    @media (max-width: 768px) {
        width: 100vw; /* Take up the entire width of the viewport */
        height: 100vh; /* Take up the entire height of the viewport */
        min-width: 100vw; /* Ensure container expands if content exceeds viewport width */
        min-height: 100vh; /* Ensure container expands if content exceeds viewport height */
        overflow: hidden;
    }
`;

const videoStyles = {
  width: "100vw",
  maxWidth: "100%",
  minHeight: "calc(100vh - 70px)",
  marginTop: "70px",
  objectFit: "cover",
};

const videoStylesDesktop = {
  width: "100vw",
  maxWidth: "100%",
  minHeight: "100%",
  marginTop: "7vh",
};

const VideoContainer = s.div`

`;

const Container = s.div`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-flow: column nowrap;
    background: var(--backgroundGradient2);
`;

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <Container>
      <NavBar />
      <VideoPlayer
        src="/videos/v2export.mp4"
        type="video/mp4"
        style={isMobile ? videoStyles : videoStylesDesktop}
      />
      <PageContainerEdited>
        <InfoContainer>
          <Title>
            <TitleContainer>
              <span style={{ fontFamily: Medium.style.fontFamily }}>CLI</span>
              <span style={{ fontFamily: Regular.style.fontFamily }}>FF</span>
              <span style={{ fontFamily: Light.style.fontFamily }}>SI</span>
              <span style={{ fontFamily: ExtraLight.style.fontFamily }}>
                DE
              </span>
            </TitleContainer>
            <TitleContainerSecond>
              <span style={{ fontFamily: Bold.style.fontFamily }}>ENTER</span>
              <span style={{ fontFamily: Regular.style.fontFamily }}>TAI</span>
              <span style={{ fontFamily: Light.style.fontFamily }}>NME</span>
              <span style={{ fontFamily: ExtraLight.style.fontFamily }}>
                NT
              </span>
            </TitleContainerSecond>
          </Title>
          <LeftColumn>
            <Logo src={logo} alt="logo" />
          </LeftColumn>
          <RightColumn>
            <SloganContainer>
              (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-end",
                  flexFlow: "column nowrap",
                  marginBottom: isMobile ? "-18px" : "45px",
                }}
              >
                <Slogan>RISE TO NEW HEIGHTS.</Slogan>
                <Slogan>ELEVATE YOUR SOUND.</Slogan>
                <Slogan>TAKE THE LEAP.</Slogan>
              </div>
              )
            </SloganContainer>
            <Button href="/contact">JOIN OUR ROSTER</Button>
          </RightColumn>
        </InfoContainer>
      </PageContainerEdited>
    </Container>
  );
}
