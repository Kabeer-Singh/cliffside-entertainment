"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../../components/navigation'
import React, { useRef, useEffect, useState } from 'react';
import { Yaldevi } from 'next/font/google';
import {Form} from '../../components/form'
const TitleFont = Yaldevi({ subsets: ['latin'], weight: '600' });

// Define props interface with isActive prop
interface FormTitleProps {
  isActive: boolean;
}


const PageContainer = s.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    background-color: #71B1CD;
    width: 100vw;
    height: 100vh;
    margin-top: 50px;
`;

const InfoContainer = s.div`
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two columns of equal width */
    height: 100%;
    width: 100%;
`;

const TitleContainer = s.div`
  align-self: center;
`

const Column1 = s.div`
  width: 100%;
  height: 100%;
  background: #00063F;
  padding-top: 10vh;
  padding-left: 5vw;
  padding-right: 5vw;
`

const Column2 = s.div`
width: 100%;
height: 100%;
background: #71B1CD;
padding-top: 10vh;
padding-left: 5vw;
padding-right: 5vw;
`

const FormTitle = s.div<FormTitleProps>`
font-family: ${TitleFont};
font-size: 3em;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 2vh;
position: relative;
color: ${props => (props.isActive ? "#FFF" : "#B3B3B3")};
&:hover {
  cursor: pointer;
}

${props =>
  props.isActive &&
  `
  &::before {
  content: '';
  position: absolute;
  left: -45px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  margin-right: 25px;
  background-color: #fff;
  border-radius: 50%;
  z-index: 1;
  opacity: 1;
  transition: opacity 2s ease-in;
}
`}
`;








export default function Home() {

    const [selectedForm, setSelectedForm] = useState('GENERAL REQUEST');

    const handleSelectionChange = (option: string) => {
      setSelectedForm(option);
    };

    return(
        <PageContainer>
            <NavBar/>
            <InfoContainer>
              <Column1>
                <FormTitle isActive={selectedForm === 'GENERAL REQUEST'} onClick={() => handleSelectionChange('GENERAL REQUEST')}>GENERAL REQUEST</FormTitle>
                <FormTitle isActive={selectedForm === 'SUBMIT MUSIC'} onClick={() => handleSelectionChange('SUBMIT MUSIC')}>SUBMIT MUSIC</FormTitle>
                <FormTitle isActive={selectedForm === 'SYNCH LICENSE REQUEST'} onClick={() => handleSelectionChange('SYNCH LICENSE REQUEST')}>SYNCH LICENSE REQUEST</FormTitle>
                <FormTitle isActive={selectedForm === 'PRESS CONTACT'} onClick={() => handleSelectionChange('PRESS CONTACT')}>PRESS CONTACT</FormTitle>
              </Column1>
              <Column2>
                {selectedForm === 'GENERAL REQUEST' && <Form inputTitle='LET US KNOW ABOUT ANY GENERAL INQUIRIES.' />}
                {selectedForm === 'SUBMIT MUSIC' && <Form submitMusic={true} inputTitle='WE RECEIVE A LOT OF SUBMISSIONS. PLEASE ALLOW UP TO 1 WEEK FOR A RESPONSE. THANKS!' />}
                {selectedForm === 'SYNCH LICENSE REQUEST' && <Form inputTitle='PLEASE INCLUDE AS MUCH INFORMATION AS POSSIBLE ABOUT THE REQUEST AND WE WILL REPLY AS QUICKLY AS POSSIBLE.' />}
                {selectedForm === 'PRESS CONTACT' && <Form inputTitle='PLEASE INCLUDE AS MUCH DETAIL AS POSSIBLE IN YOUR REQUESTS.' />}
              </Column2>
            </InfoContainer>
        </PageContainer>
    )
}