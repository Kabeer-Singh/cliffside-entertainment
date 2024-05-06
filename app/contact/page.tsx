"use client";
import Image from 'next/image'
import s from 'styled-components'
import NavBar from '../../components/navigation'
import concert from '../public/concert.jpg'
import React, { useRef, useEffect, useState } from 'react';
import { Yaldevi } from 'next/font/google';

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

const FormContainer = s.div`
`;

const InputTitle = s.h2`
color: #FFF;
font-family: ${TitleFont};
font-size: 3em;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 5vh;
`;

const FormInputs = s.div`
  display: flex;
  flex-direction: column;
`;

const FormInputLabel = s.label`
  color: #FFF;
  font-family: ${TitleFont};
  font-size: 2em;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 45px;
`;

const FormInput = s.input`
  width: 100%;
  height: 4vh;
  padding: 5px;
  border: none;
  border-bottom: 3px solid white;
  margin-bottom: 5vh;
  background: none;
  outline: none;
  font-size: 2em;
  font-family: ${TitleFont};
`;

const FormTextarea = s.textarea`
  width: 100%;
  height: 20vh;
  padding: 5px;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  background: none;
  border-bottom: 3px solid white;
  outline: none;
  font-size: 2em;
  font-family: ${TitleFont};
`;

const SubmitButton = s.button`
  width: 100%;
  height: 5vh;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  background: white;
  font-size: 2em;
  font-family: ${TitleFont};
  color: #71B1CD;
  margin-top: 5vh;
  border-radius: 20px;
`

const Form = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFullNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setMessage(e.target.value);
  };

  return (
    <FormContainer>
      <InputTitle>LET US KNOW ABOUT GENERAL INQUIRIES</InputTitle>
      <FormInputs>
        <FormInputLabel htmlFor="fullName">FULL NAME:</FormInputLabel>
        <FormInput
          type="text"
          id="fullName"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <FormInputLabel htmlFor="email">YOUR EMAIL:</FormInputLabel>
        <FormInput
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <FormInputLabel htmlFor="message">MESSAGE:</FormInputLabel>
        <FormTextarea
          id="message"
          value={message}
          onChange={handleMessageChange}
          rows={4} // Adjust the number of rows as needed
        />
      </FormInputs>
      <SubmitButton>SUBMIT REQUEST</SubmitButton>
    </FormContainer>
  );
};






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
                {selectedForm === 'GENERAL REQUEST' && <Form />}
              </Column2>
            </InfoContainer>
        </PageContainer>
    )
}