import s from 'styled-components';
import { Yaldevi } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
export const TitleFont = Yaldevi({ subsets: ['latin'], weight: '600' })

//home page exports
export const PageContainer = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row nowrap;
    background-color: #71B1CD;
    width: 100vw;
    height: 93vh;
    margin-top: 7vh;
`;
export const InfoContainer = s.div`
    border-radius: 20px;
    border: 1px solid #FFF;
    width: 100%;
    height: 90%;
    margin-left: 1vw;
    margin-right: 1vw;
    padding: 1vh 1vw;
    display: grid;
    grid-template-rows: 30% 70%;

    @media (max-width: 1000px) {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
    }


`;
export const TitleContainer = s.h1`
    color: #FFF;
    font-family: ${TitleFont};
    font-size: 7vw;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 17.36px;
    margin-right: 2vw;

    @media (max-width: 1000px) {
        font-size: 32px;
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
    font-family: ${TitleFont};
    font-size: 7vw;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 17.36px;
    align-self: flex-end;
    margin-bottom: 20px;

    @media (max-width: 1000px) {
        align-self: center;
        font-size: 32px;
    }
`;
export const LogoSloganButtonContainer = s.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: flex-start;
`;
export const Logo = s(Image)`
    width: 350px;
    height: 450.5px;
    align-self: center;
    @media (max-width: 1200px) {
        width: 250px;
        height: 350.5px;
        margin-right: 2vw;
    }
`;
export const LeftColumn = s.div`
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
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
        // margin-top: 7vh;
    }
`;
export const Slogan = s.div`
    color: #FFF;
    font-family: ${TitleFont};
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
    border-radius: 20px;
    background: #FFF;
    color: #71B1CD;
    font-family: ${TitleFont};
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
    @media (max-width: 1000px) {
        margin-bottom: 0vh;
        margin-top: 0vh;
        font-size: 24px;   
    }
`;
//about page exports
export const InfoContainerAbout = s(InfoContainer)`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-flow: column nowrap;
`;

export const ImageParagraphContainer = s.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-left: 2.5vw;
    margin-right: 2.5vw;
`;
export const LAImage = s(Image)`
    max-width: 20vw;
    height: auto;
    margin-right: 2.5vw;
    padding-right: 1em;
    border-right: 1em solid white;
`;
export const AboutParagraph = s.div`
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
export const ContactUsButton = s(Link)`
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