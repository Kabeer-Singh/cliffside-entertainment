import s from 'styled-components';
import { Yaldevi, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
export const TitleFont = Yaldevi({ subsets: ["latin"], weight: "600" })
export const CardFont = Playfair_Display({style: 'italic', weight: '500', subsets: ["latin"]})
import card from '../public/card.webp';
import {css} from 'styled-components'
const keyframes = require('styled-components').keyframes;

//home page exports
export const PageContainer = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row nowrap;
    background-color: #71B1CD;
    width: 100%; /* Take up the entire width of the viewport */
    height: 100%; /* Take up the entire height of the viewport */
    min-width: 100vw; /* Ensure container expands if content exceeds viewport width */
    min-height: 93vh; /* Ensure container expands if content exceeds viewport height */
    margin-top: 7vh;    
    @media (max-width: 1000px) {
        margin-top: 0vh;
        width: 100vw; /* Take up the entire width of the viewport */
        height: 100vh; /* Take up the entire height of the viewport */
        min-width: 100vw; /* Ensure container expands if content exceeds viewport width */
        min-height: 100vh; /* Ensure container expands if content exceeds viewport height */
        overflow: auto;
    }
`;
export const InfoContainer = s.div`
    border-radius: 20px;
    border: 1px solid #FFF;
    width: 100%;
    height: 85vh;

    
    
    margin-left: 1vw;
    margin-right: 1vw;
    margin-top: 3vh;
    padding: 1vh 1vw;
    display: grid;
    grid-template-rows: 30% 70%;

    @media (max-width: 1000px) {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        overflow: auto;
    }


`;
export const TitleContainer = s.h1`
    color: #FFF;
    font-family: ${TitleFont.style.fontFamily};
    font-size: 7vw;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 17.36px;
    margin-right: 2vw;
    margin-top: 0;
    margin-bottom: 0;

    @media (max-width: 1000px) {
        font-size: 32px;
        margin-right: 0;
    }
`
export const Title = s.div`
    display: flex;
    flex-flow: column nowrap;
    grid-row: 1 / span 1; /* Top row spans one row */
    grid-column: 1 / span 2; /* Top row spans two columns */

    @media (max-width: 1000px) {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
`
export const TitleContainerSecond = s.h1`
    color: #FFF;
    font-family: ${TitleFont.style.fontFamily};
    font-size: 7vw;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 17.36px;
    align-self: flex-end;
    margin-top: 0;
    margin-bottom: 0;

    @media (max-width: 1000px) {
        align-self: center;
        font-size: 32px;
        letter-spacing: 7px;
    }
`;
export const Logo = s(Image)`
    width: 350px;
    height: 450.5px;
    align-self: center;
    @media (max-width: 1200px) {
        width: 175px;
        height: 200px;
        margin-right: 0vw;
    }
`;
export const LeftColumn = s.div`
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    @media (max-width: 1000px) {
        margin-top: 0vh;
    }
`;
export const RightColumn = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    grid-row: 2 / span 1; /* Bottom right column spans one row */
    grid-column: 2 / span 1; /* Bottom right column spans one column */
    margin-right: 2vw;
    margin-left: 2vw;
    @media (max-width: 1000px) {
        margin-top: 0vh;

    }
`;
export const Slogan = s.div`
    color: #FFF;
    font-family: ${TitleFont.style.fontFamily};
    font-size: 2vw;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 1vh;
    @media (max-width: 1000px) {
        font-size: 24px;
    }
`;
export const Button = s(Link)`
  text-decoration: none;
  border-radius: 20px;
  background: #FFF;
  color: #71B1CD;
  font-family: ${TitleFont.style.fontFamily};
  font-size: 2em;
  font-style: normal;
  font-weight: 600;
  line-height: 132.877%;
  padding-left: 20vw;
  padding-right: 20vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  text-align: center!important;
  margin-bottom: 5vh;
  margin-top: 5vh;
  width: 100%;
  box-sizing: border-box; /* Add this line */
  @media (max-width: 1000px) {
    margin-bottom: 0vh;
    margin-top: 0vh;
    font-size: 24px;
    padding-left: 5vw;
    padding-right: 5vw;
    justify-self: flex-end;
  }
`;



//about page exports
export const InfoContainerAbout = s(InfoContainer)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column nowrap;
    width: 100%;
    height 100%;
`;

const keyframesAnimations = {
    buildStroke: keyframes`
      0% {
        width: 0;
      }
      50% {
        width: calc(120% - 5vw);
      }
      100% {
        width: calc(120% - 1vw);
      }
    `,
    // Define other keyframes animations as needed
  };

export const Stroke = s.div`
    position: absolute;
    bottom: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: calc(120% - 1vw); /* Adjust the width as needed */
    height: 5px;
    background-color: white; /* Adjust the color of the stroke */
    animation-name: ${keyframesAnimations.buildStroke}; /* Apply the buildStroke animation */
    -webkit-animation-name: ${keyframesAnimations.buildStroke};
    animation-duration: 2s;
    animation-fill-mode: forwards;
    z-index: 600;
`;

export const ImageParagraphContainer = s.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the items horizontally */
  @media (max-width: 1000px) {
    flex-direction: row;
  }
`;

export const CardsContainer = s.div`
  display: flex;
  justify-content: center; /* Center the cards horizontally */
  margin-top: 20px; /* Add space between the title content and the cards */
  @media (max-width: 1000px) {
    display: block
  }
`;

export const MainContainer = s.div`
  width: 17vw;
  height: 40vh;
  background: none;
  background-size: cover; /* Ensure the image covers the entire container */  
  margin: 2vh 3vw; /* Add space between the cards */
  transition: all 0.3s ease-in-out; /* Add transition for smooth animation */
  transform-origin: center; /* Set transform origin to center */
  cursor: pointer; /* Change cursor on hover */
  
  @media (max-width: 1000px) {
    width: 70vw;
    height: 50vh;
  }
  /* Grow size on hover */
  &:hover {
    transform: scale(1.1); /* Increase scale on hover */
    cursor: pointer;
  }
  &:active {
    transform: scale(1.1); /* Increase scale on hover */
  }
`;

export const TheCard = s.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transform-style: preserve-3d;
  transition: all 0.8s ease;

  /* THE PSUEDO CLASS CONTROLS THE FLIP ON MOUSEOVER AND MOUSEOUT */
  &:hover {
    transform: rotateY(180deg);
  }
  &:active {
    transform: rotateY(180deg);
  }
`;

export const TheFront = s(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
  overflow: hidden;
  color: #000;
`;

export const TheBack = s.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    backface-visibility: hidden;
    overflow: hidden;
    background: #fafafa;
    color: #4e5b82;
    font-family: ${CardFont.style.fontFamily};
    font-size: 20px;
    font-weight: 500;
    font-style: italic;
    line-height: normal;
    letter-spacing: 4.48px;
    text-align: center;
    transform: rotateY(180deg);
    // text-shadow: 
    //   -.2px -.2px 0 #4e5b82,  
    //    .2px -.2px 0 #4e5b82,
    //   -.2px  .2px 0 #4e5b82,
    //    .2px  .2px 0 #4e5b82; // Change #000 to your desired stroke color
    // -webkit-text-stroke: .2px #4e5b82; // 1px stroke width with black color
`;

export const BackCardContainer = s.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%; // Ensure it uses the full height of TheBack
    width: 100%; // Ensure it uses the full width of TheBack
`;


// Keyframes for wave animation
export const waveAnimation = keyframes`
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
`;

export const swellAnimation = keyframes`
  0%, 100% {
    transform: translate3d(0, -25px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
`;

// Interface for Wave props
interface WaveProps {
  type?: 'second';  // Define the type as an optional property that accepts 'second'
}

// Styled component for Ocean
export const Ocean = s.div`
  height: 5%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #015871;
`;

// Styled component for Wave
export const Wave = s.div<WaveProps>`
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 30vh;
  animation: ${css`${waveAnimation} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite`};
  transform: translate3d(0, 0, 0);
  opacity: ${props => props.type === 'second' ? 1 : undefined};
  top: ${props => props.type === 'second' ? '-175px' : '-198px'};
  animation: ${props => props.type === 'second' 
    ? css`${waveAnimation} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -.125s infinite, ${swellAnimation} 7s ease -1.25s infinite` 
    : css`${waveAnimation} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite`};
`;






export const ContactUsButton = s(Link)`
    color: #000;
    text-align: center;
    font-family: ${TitleFont.style.fontFamily};
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