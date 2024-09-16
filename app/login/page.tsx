"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../../components/navigation'
import concert from '../public/concert.jpg'
import React, { useRef, useEffect, useState } from 'react';
import { Yaldevi } from 'next/font/google';
const TitleFont = Yaldevi({ subsets: ['latin'], weight: '600' })
import { PageContainer, InfoContainer } from '@/components/styled-components';
import Login from './Login'


const Container = s.div`
display: flex;
align-items: center;
justify: content;
`

export default function Home() {

    return(
      <PageContainer>
      <NavBar/>
      <Container>
        <Login/>
      </Container>
    </PageContainer>
    )
}