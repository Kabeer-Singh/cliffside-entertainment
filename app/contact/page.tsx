"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../../components/navigation'
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
  align-items: flex-start;
  width: 100vw;
  margin-top: 170px;
`

export default function Home() {

    return(

        <PageContainer>
            <NavBar/>
            <FrontPageContainer>
                NEED CONTENT
            </FrontPageContainer>
        </PageContainer>
    )
}