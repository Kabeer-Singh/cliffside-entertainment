"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../components/navigation'
import dolph from '../public/logos/dolph.jpeg'

const PageContainer = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
`;

const FrontPageContainer = s.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: space between;
  width: 90vw;
`

const Logo = s.div`
  object-fit: cover;
  width: 500px;
  height: 870px;
  border-radius: 5px;
  border: 1px solid #26AAE3;
`

const TextContainer = s.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: space between;
  text-align: right;
  width: 500px;
  height: 870px;
  margin-left: 285px;
`

const Text = s.div`
color: #000;
margin-bottom: 165px;
text-align: right;
font-family: Public Sans;
font-size: 64px;
font-style: normal;
font-weight: 200;
line-height: normal;
-webkit-text-stroke: 2px #26AAE3; /* Width and color of the text outline */
background-clip: text; /* Clip the text to the background color */
-webkit-background-clip: text; 
`

export default function Home() {
  return (
    <PageContainer>
      <NavBar/>

      <FrontPageContainer>
        <Logo><Image src={dolph} alt="cover"></Image></Logo>
        <TextContainer>
          <Text>Los-Angeles based.</Text>
          <Text>Sync & Creative Powerhouse  Collaborations.</Text>
          <Text>composers. artists. creatives.</Text>
        </TextContainer>
      </FrontPageContainer>
    </PageContainer>
  )
}
