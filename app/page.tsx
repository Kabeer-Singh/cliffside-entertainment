"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../components/navigation'
import React, { useRef, useEffect, useState } from 'react';
import { Yaldevi } from 'next/font/google';
import logo from '../public/logos/mockUpLogo.png';

const TitleFont = Yaldevi({ subsets: ['latin'], weight: '600' })

const PageContainer = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    background-color: #71B1CD;
    width: 100vw;
    height: 100vh;
`;

const InfoContainer = s.div`
  border-radius: 20px;
  border: 1px solid #FFF;
  width: 98vw;
  height: 100vh;
  margin-top: 75px;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 29px;
`;

const TitleContainer = s.div`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 124px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 17.36px;
`

const TitleContainerSecond = s.div`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 124px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 17.36px;
  align-self: flex-end;
  margin-left: 202px;
  margin-bottom: 20px;
`;

const LogoSloganButtonContainer = s.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: flex-start;
`;

const Logo = s(Image)`
  width: 350px;
  height: 450.5px;
  margin-left: 70px;
`;

const SloganButtonContainer = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
`;

const Slogan = s.div`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 64px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 3vh;
`;

const Button = s.button`
border-radius: 20px;
background: #FFF;
color: #71B1CD;
font-family: ${TitleFont};
font-size: 64px;
font-style: normal;
font-weight: 600;
line-height: 132.877%; 
padding-left: 130px;
padding-right: 130px;
padding-top: 13px;
padding-bottom: 13px;
text-align: center !important;
margin-bottom: 5vh;
`


export default function Home() {
  return (
    <PageContainer>
      <NavBar/>
      <InfoContainer>
        <TitleContainer>CLIFFSIDE</TitleContainer>
        <TitleContainerSecond>ENTERTAINMENT</TitleContainerSecond>
        <LogoSloganButtonContainer>
          <Logo src={logo} alt='logo'/>
          <SloganButtonContainer>
            <Slogan style={{alignSelf: 'flex-start'}}>RISE TO NEW HEIGHTS</Slogan>
            <Slogan style={{alignSelf: 'center'}}>ELEVATE YOUR SOUND</Slogan>
            <Slogan style={{alignSelf: 'flex-end'}}>TAKE THE LEAP</Slogan>
            <Button>JOIN OUR ROSTER</Button>
          </SloganButtonContainer>
        </LogoSloganButtonContainer>
          
      </InfoContainer>
    </PageContainer>
  )
}
