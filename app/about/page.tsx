"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../../components/navigation'
import concert from '../public/concert.jpg'
import React, { useRef, useEffect, useState } from 'react';
import jalen from '../../public/Jalen.jpeg'

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
  align-items: flex-start;
  width: 100vw;
  margin-top: 170px;
`

const JalenImage = s.div`
    background-size: contain;
    background-position: center;
    width: 23vw;
    height: 40vh;
    margin-right: 75px;
    background-image: url('Jalen.jpeg');
    border: solid 2px #26AAE3;
`

const Text = s.div`
    width: 43vw;
    align-items: flex-start;
    justify-content: center;
    text-align: left;
    `

const Name = s.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  font-family: Public Sans;
`;

const Position = s.p`
  font-size: 1.5rem;
  font-weight: normal;
  margin: 10px 0;
  font-family: Public Sans;

`;

const Bio = s.p`
  font-size: 1rem;
  font-weight: normal;
  font-family: Public Sans;

`;


export default function Home() {

    return(
        <PageContainer>
            <NavBar/>
            <FrontPageContainer>
                <JalenImage/>
                <Text>
                    <Name>Jalen Stokes</Name>
                    <Position>CEO, Founder</Position>
                    <Bio>
                    Stokes, the mastermind behind [Music Agency Name], is a true visionary in the music industry. With an insatiable passion for the rhythm and rhyme of Rap and R&B, Stokes has orchestrated a dazzling career filled with success, creativity, and a deep love for the beats that make hearts groove.
                    🎓🎵 The Trojan Maestro 🎵🎓
                    From the early days of banging beats to the present moment where Stokes thrives as a Label Coordinator at Position Music, their journey has been nothing short of a music-filled odyssey. Stokes began their epic quest for greatness by pursuing a degree in the Music Industry at the legendary University of Southern California (USC).
                    📀🌟 A Star-Maker Extraordinaire 🌟📀
                    But Stokes didn't stop there. With boundless energy, they've managed to sign over 10 exceptional artists to major record labels, showcasing a unique talent for spotting the raw talent that lies hidden in the beats of the streets.
                    At [Music Agency Name], our founder doesn't just curate talent; they ignite it. The path from the studio to stardom has never been smoother or more exciting.
                    🌌🚀 Join the Constellation of Stars 🚀🌌
                    Are you an aspiring Rap or R&B artist looking to set the world on fire with your sound? Our founder, Stokes, encourages you to reach out and make your musical dreams a reality. The stage is set, the lights are dimmed, and we're waiting for your unique brilliance to light up the night sky.
                    Feel the groove, chase your dreams, and reach out to us today! 🎉🎤🌟
                    Don't wait! Let's create the next chart-topping sensation together. Your journey to stardom begins here. 🎵🎆🌠
                    📩 Contact Stokes at ceo@cliffside.com to start your music adventure! 🎶📢📀
                    </Bio>
                </Text>
            </FrontPageContainer>
        </PageContainer>
        
    )
}