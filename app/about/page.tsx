"use client";
import NavBar from '../../components/navigation';
import {
  PageContainer,
  InfoContainer,
  InfoContainerAbout,
  TitleContainer,
  ImageParagraphContainer,
  ContactUsButton,
  TheCard,
  MainContainer,
  TheFront,
  TheBack,
  CardsContainer,
  Stroke,
  BackCardContainer,
  Ocean,
  Wave,
} from '@/components/styled-components';
import s from 'styled-components';
import VideoPlayer from '@/components/VideoPlayer';
import { useCallback, useEffect, useState } from 'react';

// Update video styles to cover the entire viewport
const videoStyles = {
  width: '100vw',
  marginTop: '6vh',
  height: '100vh', // Make the video fill the entire height of the viewport
  position: 'fixed', // Keep the video fixed in place
  top: 0,
  left: 0,
  objectFit: 'cover',
};

// Update video styles to cover the entire viewport
const videoStylesMobile = {
  width: '100vw',
  height: '100vh', // Make the video fill the entire height of the viewport
  position: 'fixed', // Keep the video fixed in place
  top: 0,
  left: 0,
  objectFit: 'scale-down',
};



//home page exports
export const PageContainerEdited = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row nowrap;
    background: var(--backgroundGradient2);
    width: 100%; /* Take up the entire width of the viewport */
    min-width: 100vw; /* Ensure container expands if content exceeds viewport width */
    min-height: 93vh; /* Ensure container expands if content exceeds viewport height */
    margin-top: 7vh;    
    @media (max-width: 1000px) {
        margin-top: 0vh;
        width: 100vw; /* Take up the entire width of the viewport */
        height: 100vh; /* Take up the entire height of the viewport */
        min-width: 100vw; /* Ensure container expands if content exceeds viewport width */
        min-height: 100vh; /* Ensure container expands if content exceeds viewport height */
        overflow: hidden;
    }

  flex-flow: column nowrap;
  height: 100vh;
  overflow: hidden; 
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

  const [videoSource, setVideoSource] = useState<string>('');
  const [type, setType] = useState<string>('');

  useEffect(() => {
    const getBrowser = () => {
      const userAgent = navigator.userAgent;

      if (
        userAgent.includes('Chrome') &&
        !userAgent.includes('Edge') &&
        !userAgent.includes('OPR')
      ) {
        return 'Chrome';
      } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        return 'Safari';
      } else {
        return 'Other';
      }
    };

    const browser = getBrowser();

    if (browser === 'Chrome') {
      setVideoSource(() => '/videos/chromeYolo.webm');
      setType(() => 'video/webm');
      console.log('CHROME');
    } else if (browser === 'Safari') {
      setVideoSource(() => '/videos/yolo.mov');
      setType(() => 'video/quicktime');
      console.log('SAFARI');
    } else {
      setVideoSource(() => '/videos/chromeYolo.webm');
      setType(() => 'video/webm');
    }
  }, []);

  return (
    <PageContainerEdited>
      <NavBar />
      <VideoPlayer src={videoSource} type={type} style={isMobile ? videoStylesMobile : videoStyles} />
    </PageContainerEdited>
  );
}