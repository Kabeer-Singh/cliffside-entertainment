"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../components/navigation'
import concert from '../public/concert.jpg'
import React, { useRef, useEffect, useState } from 'react';


const PageContainer = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
`;

const FrontPageContainer = s.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 130px;
`

const Logo = s.div`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  background-image: url('cliff.webp');

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    z-index: -1;
    filter: grayscale(100%) !important;
  }

  &:hover .content {
    opacity: 1;
  }
`

const TextContainer = s.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0; /* Initially, set opacity to 0 for the fade-in effect */
  transition: opacity 1s; /* Add a transition for opacity with a duration of 1 second */
  z-index: 1;
`




const HeaderText = s.div`
color: white !important;
margin-bottom: 25px;
text-align: center;
font-family: Public Sans;
font-size: 95px;
letter-spacing: 2px;
font-style: normal;
font-weight: 200;
line-height: normal;
background-clip: text; /* Clip the text to the background color */
-webkit-background-clip: text; 
`

const Text = s.div`
color: white !important;
margin-bottom: 15px;
text-align: right;
font-family: Public Sans;
font-size: 64px;
font-style: normal;
font-weight: 400;
line-height: normal;
-webkit-text-stroke: 2px #26AAE3; /* Width and color of the text outline */
background-clip: text; /* Clip the text to the background color */
-webkit-background-clip: text; 
`

export default function Home() {
  const sectionRefs = [useRef(), useRef(), useRef()]; // Create an array of refs for your sections
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY > 0) {
        // Scrolling down
        if (currentSectionIndex < sectionRefs.length - 1) {
          sectionRefs[currentSectionIndex + 1].current.scrollIntoView({ behavior: 'smooth', block: 'start', // or 'center', 'end', or 'nearest'
          inline: 'start', });
          setCurrentSectionIndex(currentSectionIndex + 1);
        }
      } else {
        // Scrolling up
        if (currentSectionIndex > 0) {
          sectionRefs[currentSectionIndex - 1].current.scrollIntoView({ behavior: 'smooth', block: 'start', // or 'center', 'end', or 'nearest'
          inline: 'start', });
          setCurrentSectionIndex(currentSectionIndex - 1);
        }
      }
    };

    // Attach the wheel event listener when the component mounts
    window.addEventListener('wheel', handleScroll, { passive: false });

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentSectionIndex, sectionRefs]);

  return (
    <PageContainer>

      <NavBar/>

      <FrontPageContainer ref={sectionRefs[0]}>
        <Logo>
        <TextContainer className='content'>
          <HeaderText>ClIFFSIDE ENTERTAINMENT</HeaderText>
          <Text>Los-Angeles based.</Text>
          <Text>Sync & Creative Powerhouse  Collaborations.</Text>
          <Text>composers. artists. creatives.</Text>
        </TextContainer>
        </Logo>
      </FrontPageContainer>

      {/* Section Section of homepage */}
      <FrontPageContainer>
        <Text ref={sectionRefs[1]}>Section Content</Text>
        <TextContainer>
          <Text>Los-Angeles based.</Text>
          <Text>Sync & Creative Powerhouse  Collaborations.</Text>
          <Text>composers. artists. creatives.</Text>
        </TextContainer>
      </FrontPageContainer>
    </PageContainer>
  )
}
