"use client";
import NavBar from '../components/navigation'
import React, { useRef, useEffect, useState } from 'react';
import s from 'styled-components';
import logo from '../public/logos/mockUpLogo.png';
import { PageContainer, InfoContainer, Title, TitleContainer, TitleContainerSecond, LeftColumn, Logo, RightColumn, Slogan, Button } from '../components/styled-components'
import { Oswald } from 'next/font/google';
import VideoPlayer from '../components/VideoPlayer';
const Bold = Oswald({ subsets: ["latin"], weight: '700' })
const Medium = Oswald({ subsets: ["latin"], weight: "500" })
const Regular = Oswald({ subsets: ["latin"], weight: "400" })
const Light = Oswald({ subsets: ["latin"], weight: "300" })
const ExtraLight = Oswald({ subsets: ["latin"], weight: "200" })

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
`
const PageContainerEdited = s(PageContainer)`
  flex-flow: column nowrap;
`

const videoStyles = {
  width: '100vw',
  maxWidth: '100%',
  height: '100%',
};


export default function Home() {

  return (
    <PageContainerEdited>
      <NavBar/>
      <VideoPlayer src="/videos/v2export.mp4" type="video/mp4" style={videoStyles}/>
      <InfoContainer>
        <Title>
          <TitleContainer>
            <span style={{ fontFamily: Medium.style.fontFamily }}>CLI</span>
            <span style={{ fontFamily: Regular.style.fontFamily }}>FF</span>
            <span style={{ fontFamily: Light.style.fontFamily }}>SI</span>
            <span style={{ fontFamily: ExtraLight.style.fontFamily }}>DE</span>
          </TitleContainer>
          <TitleContainerSecond>
            <span style={{ fontFamily: Bold.style.fontFamily }}>ENTER</span>
            <span style={{ fontFamily: Regular.style.fontFamily }}>TAI</span>
            <span style={{ fontFamily: Light.style.fontFamily }}>NME</span>
            <span style={{ fontFamily: ExtraLight.style.fontFamily }}>NT</span>
          </TitleContainerSecond>
        </Title>
        <LeftColumn>
          <Logo src={logo} alt='logo'/>
        </LeftColumn>
        <RightColumn>
          <SloganContainer> (
            <div  style={{display: 'flex', alignItems:'center', justifyContent:'flex-end', flexFlow: 'column nowrap',marginBottom: '45px',}}>
              <Slogan>RISE TO NEW HEIGHTS.</Slogan>
              <Slogan>ELEVATE YOUR SOUND.</Slogan>
              <Slogan>TAKE THE LEAP.</Slogan>
            </div>
          )
          </SloganContainer>
          <Button href='/contact'>JOIN OUR ROSTER</Button>
        </RightColumn>
      </InfoContainer>
    </PageContainerEdited>
  )
}
