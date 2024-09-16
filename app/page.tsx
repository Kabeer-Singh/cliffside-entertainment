"use client";
import NavBar from "../components/navigation";
import React, { useRef, useEffect, useState } from "react";
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
import VideoPlayer from "../components/VideoPlayer";
const Bold = Oswald({ subsets: ["latin"], weight: "700" });
const Medium = Oswald({ subsets: ["latin"], weight: "500" });
const Regular = Oswald({ subsets: ["latin"], weight: "400" });
const Light = Oswald({ subsets: ["latin"], weight: "300" });
const ExtraLight = Oswald({ subsets: ["latin"], weight: "200" });

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
    @media (max-width: 1000px) {
        margin-top: 0vh;
        width: 100vw; /* Take up the entire width of the viewport */
        height: 100vh; /* Take up the entire height of the viewport */
        min-width: 100vw; /* Ensure container expands if content exceeds viewport width */
        min-height: 100vh; /* Ensure container expands if content exceeds viewport height */
        overflow: auto;
    }
`;

const videoStyles = {
  width: "100vw",
  maxWidth: "100%",
  minheight: "100vh",
  marginTop: "7vh",
};

const VideoContainer = s.div`

`;

const Container = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    background: var(--backgroundGradient2);
`;






export default function Home() {
  return (
    <Container>
      <NavBar />
        <VideoPlayer
          src="/videos/v2export.mp4"
          type="video/mp4"
          style={videoStyles}
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
              {" "}
              (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexFlow: "column nowrap",
                  marginBottom: "45px",
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
