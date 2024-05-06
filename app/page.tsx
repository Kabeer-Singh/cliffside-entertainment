"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../components/navigation'
import React, { useRef, useEffect, useState } from 'react';
import { Yaldevi } from 'next/font/google';
import logo from '../public/logos/mockUpLogo.png';
import Link from 'next/link';

const TitleFont = Yaldevi({ subsets: ['latin'], weight: '600' })

const PageContainer = s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row nowrap;
  background-color: #71B1CD;
  width: 100vw;
  height: 100vh;
  margin-top: 90px;
`;
const InfoContainer = s.div`
    border-radius: 20px;
    border: 1px solid #FFF;
    width: 100%;
    height: 90%;
    margin-left: 1vw;
    margin-right: 1vw;
    margin-bottom: 5vh;
    padding: 1vh 1vw;
    display: grid;
    grid-template-rows: 30% 70%;
`;
const TitleContainer = s.h1`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 7vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 17.36px;
  margin-right: 2vw;
`
const Title = s.div`
  display: flex;
  flex-flow: column nowrap;
  grid-row: 1 / span 1; /* Top row spans one row */
  grid-column: 1 / span 2; /* Top row spans two columns */
`
const TitleContainerSecond = s.h1`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 7vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 17.36px;
  align-self: flex-end;
  margin-bottom: 20px;
  align-self: flex-end;
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
  align-self: center;
`;
const LeftColumn = s.div`
grid-row: 2 / span 1;
grid-column: 1 / span 1;
display: flex;
justify-content: center; /* Center content horizontally */
align-items: center; /* Center content vertically */
`;
const RightColumn = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    grid-row: 2 / span 1; /* Bottom right column spans one row */
    grid-column: 2 / span 1; /* Bottom right column spans one column */
    margin-right: 2vw;
`;
const Slogan = s.div`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 2vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1vh;
`;
const Button = s(Link)`
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
width: 100%;
`


export default function Home() {
  return (
    <PageContainer>
      <NavBar/>
      <InfoContainer>
        
        <Title>
          <TitleContainer>CLIFFSIDE</TitleContainer>
          <TitleContainerSecond>ENTERTAINMENT</TitleContainerSecond>
        </Title>
        
        <LeftColumn>
          <Logo src={logo} alt='logo'/>
        </LeftColumn>
        
        <RightColumn>
          <Slogan style={{alignSelf: 'flex-start'}}>RISE TO NEW HEIGHTS</Slogan>
          <Slogan style={{alignSelf: 'center'}}>ELEVATE YOUR SOUND</Slogan>
          <Slogan style={{alignSelf: 'flex-end'}}>TAKE THE LEAP</Slogan>
          <Button href='/contact'>JOIN OUR ROSTER</Button>
        </RightColumn>
        
      </InfoContainer>
    </PageContainer>
  )
}
