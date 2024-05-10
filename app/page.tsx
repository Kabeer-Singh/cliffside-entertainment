"use client";
import NavBar from '../components/navigation'
import React, { useRef, useEffect, useState } from 'react';
import logo from '../public/logos/mockUpLogo.png';
import { PageContainer, InfoContainer, Title, TitleContainer, TitleContainerSecond, LeftColumn, Logo, RightColumn, Slogan, Button } from '../components/styled-components'

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
          <Slogan style={{alignSelf: 'center', marginLeft: '6vw'}}>ELEVATE YOUR SOUND</Slogan>
          <Slogan style={{alignSelf: 'flex-end'}}>TAKE THE LEAP</Slogan>
          <Button href='/contact'>JOIN OUR ROSTER</Button>
        </RightColumn>
      </InfoContainer>
    </PageContainer>
  )
}
