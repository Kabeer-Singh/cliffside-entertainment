"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../../components/navigation'
import React, { useRef, useEffect, useState } from 'react';
import { Yaldevi } from 'next/font/google';
import la from '../../public/LA.png'
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
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

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-flow: column nowrap;
`;

const TitleContainer = s.div`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 8em;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 17.36px;
  text-align: center;
  justify-self: flex-start;
`;



const ImageParagraphContainer = s.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-left: 2.5vw;
    margin-right: 2.5vw;
`;


const LAImage = s(Image)`
  max-width: 20vw;
  height: auto;
  margin-right: 2.5vw;
  padding-right: 1em;
  border-right: 1em solid white;
`;
const AboutParagraph = s.div`
color: #FFF;
font-family: ${TitleFont};
font-size: 3em;
font-style: normal;
font-weight: 600;
line-height: 133.07%; /* 59.881px */
letter-spacing: 6.3px;
display: flex;
justify-content: space-between;
align-items: flex-start;
flex-flow: column nowrap;
height: 100%;
`;



const ContactUsButton = s(Link)`
  color: #000;
  text-align: center;
  font-family: ${TitleFont};
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 4.48px;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 20px;
  border: 1px solid #FFF;
  background: #FFF;
  max-width: 649px;
  align-self: center;
`;

export default function Home() {


    return(
        <PageContainer>
            <NavBar/>
            <InfoContainer>
              <TitleContainer>(about)</TitleContainer>
              <ImageParagraphContainer>
                <LAImage src={la} alt='la'/>
                <AboutParagraph>
                  <div>based Sync & Creative Powerhouse.</div>
                  <div>We foster collaborations between our artists & industry professionals.</div>
                  <div>We facilitate creative opportunities in Film and TV, brand campaigns, advertisements, and more!</div>
                </AboutParagraph>
              </ImageParagraphContainer>
              <ContactUsButton href='/contact'>CONTACT US</ContactUsButton>
            </InfoContainer>
        </PageContainer>
    )
}