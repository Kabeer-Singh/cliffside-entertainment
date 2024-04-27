"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../../components/navigation'
import concert from '../public/concert.jpg'
import React, { useRef, useEffect, useState } from 'react';
import { Yaldevi } from 'next/font/google';

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
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TitleContainer = s.div`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 124px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 17.36px;
  align-self: center;
`

export default function Home() {

    return(
        <PageContainer>
            <NavBar/>
            <InfoContainer>
              <TitleContainer>(about)</TitleContainer>
            </InfoContainer>
        </PageContainer>
    )
}