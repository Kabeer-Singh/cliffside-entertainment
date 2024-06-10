"use client";
import NavBar from '../../components/navigation'
import { PageContainer, InfoContainerAbout, TitleContainer, ImageParagraphContainer, ContactUsButton, TheCard, MainContainer, TheFront, TheBack, CardsContainer, Stroke, BackCardContainer, Ocean, Wave  } from '@/components/styled-components';
import card from '../../public/card.png';


export default function Home() {
    return(
        <PageContainer>
            <NavBar/>
            <InfoContainerAbout>
              <TitleContainer style={{position: 'relative'}}>(about) <Stroke /> {/* Stroke component */}</TitleContainer>
              
              <ImageParagraphContainer>
                <CardsContainer>
                  <MainContainer>
                    <TheCard>
                      <TheFront src={card} alt='card'>
                      </TheFront>
                      <TheBack>
                        <BackCardContainer>
                          <div style={{ zIndex: 10, padding: '2vw 3vh'}}>LA BASED <br></br>SYNC & CREATIVE POWERHOUSE.</div>
                          <Ocean>
                            <Wave />
                            <Wave type="second" />
                          </Ocean>
                        </BackCardContainer>
                      </TheBack>
                    </TheCard>
                  </MainContainer>

                  <MainContainer>
                    <TheCard>
                      <TheFront src={card} alt='card'>
                      </TheFront>
                      <TheBack>
                        <BackCardContainer>
                          <div style={{ zIndex: 10, padding: '2vw 3vh'}}>We CREATE OPPORTUNITIES IN FILM, TV, ADS, & MORE</div>
                          <Ocean>
                            <Wave />
                            <Wave type="second" />
                          </Ocean>
                        </BackCardContainer>
                      </TheBack>
                    </TheCard>
                  </MainContainer>

                  <MainContainer>
                    <TheCard>
                      <TheFront src={card} alt='card'>
                      </TheFront>
                      <TheBack>
                        <BackCardContainer>
                          <div style={{ zIndex: 10, padding: '2vw 3vh'}}>We CONNECT ARTISTS WITH INDUSTRY PROFESSIONALS.</div>
                          <Ocean>
                            <Wave />
                            <Wave type="second" />
                          </Ocean>
                        </BackCardContainer>
                      </TheBack>
                    </TheCard>
                  </MainContainer>
                </CardsContainer>
              </ImageParagraphContainer>
              <ContactUsButton href='/contact'>CONTACT US</ContactUsButton>
            </InfoContainerAbout>
        </PageContainer>
    )
}