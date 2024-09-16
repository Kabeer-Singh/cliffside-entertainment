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
import { useEffect, useState } from 'react';

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

// Update PageContainer to occupy the full height and prevent overflow
const PageContainerEdited = s(PageContainer)`
  flex-flow: column nowrap;
  height: 100vh;
  overflow: hidden; // Prevent scrolling
`;

export default function Home() {
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
      <VideoPlayer src={videoSource} type={type} style={videoStyles} />
    </PageContainerEdited>
  );
}
