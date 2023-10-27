"use client";
import React from "react";
import s from "styled-components";
import { useRouter } from "next/navigation";
import img from "../public/logos/Cliffside_Logo_Black.png";
import Image from "next/image";

const NavigationContainer = s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 90vw;
  background-color: black;
`;


const TabHeader = s.div`
    color: #26AAE3;
    font-family: Public Sans;
    font-size: 36px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    margin-right: 82px;
    margin-left: 82px;

    border-bottom: 2px solid transparent; /* Initially, the border is transparent */
    transition: border-bottom 0.3s ease-in-out; /* Add a transition effect */

    &:hover {
        cursor: pointer;
        border-bottom: 2px solid #26AAE3;
    }
`;

const Logo = s.div`
    width: 120px;
    height: 120px;
    object-fit: cover;

    &:hover {
        cursor: pointer;
    }
`;

const LoginButton = s.button`
    width: 149px;
    height: 60px;
    border: 1px solid #26AAE3;
    border-radius: 3px;
    
    color: #26AAE3;
    font-family: Public Sans;
    font-size: 36px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;

    align-text: center;

    padding: 7px;

    &:hover {
        cursor: pointer;
        background: #26AAE3;
        color: black;
    }
`;



export default function NavBar() {
    
    const router = useRouter();
    
    function handleClick(route) {
        router.push(route);
    }
    

    return(
        <NavigationContainer>
            <Logo  onClick={() => handleClick('/')} ><Image src={img} alt="logo"></Image></Logo>
            <TabHeader onClick={() => handleClick('/')}>home</TabHeader>
            <TabHeader onClick={() => handleClick('about')}>about</TabHeader>
            <TabHeader onClick={() => handleClick('our-work')}>our work</TabHeader>
            <TabHeader onClick={() => handleClick('contact')}>contact</TabHeader>
            <LoginButton>login</LoginButton>
        </NavigationContainer>
    )
}
