"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../../components/navigation'
import concert from '../public/concert.jpg'
import React, { useRef, useEffect, useState } from 'react';
import { PageContainer, InfoContainer, Title, TitleContainer, TitleContainerSecond, LeftColumn, Logo, RightColumn, Slogan, Button } from '@/components/styled-components';








export default function Home() {

    return(
        <PageContainer>
            <NavBar/>
            <InfoContainer>
              <TitleContainer>(artists)</TitleContainer>
            </InfoContainer>
        </PageContainer>
        
    )
}