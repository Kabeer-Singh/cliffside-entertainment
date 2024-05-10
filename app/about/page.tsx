"use client";
import NavBar from '../../components/navigation'
import la from '../../public/LA.png'
import { PageContainer, TitleFont, InfoContainerAbout, TitleContainer, ImageParagraphContainer, LAImage, AboutParagraph, ContactUsButton } from '@/components/styled-components';

export default function Home() {
    return(
        <PageContainer>
            <NavBar/>
            <InfoContainerAbout>
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
            </InfoContainerAbout>
        </PageContainer>
    )
}