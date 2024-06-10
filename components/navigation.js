import React, {useState, useEffect} from "react";
import s, {keyframes} from "styled-components";
import { useRouter } from "next/navigation";
import { Saira_Extra_Condensed } from "next/font/google";

const daFont = Saira_Extra_Condensed({ subsets: ['latin'], weight: '200' });

const NavigationContainer = s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  background-color: #020307;
  z-index: 1000;
`;
const NavBarItems = s.div`
    margin-left: 24px;
    display: flex;
    align-items: center;
    justify-content:center;
`;
const TabHeader = s.div`
    color: #71B1CD;
    font-family: ${daFont.style.fontFamily};
    font-size: 24px;
    font-style: normal;
    line-height: normal;
    margin-right: 34px;
    position: relative;

    &:hover {
        cursor: pointer;
    }
    /* Define the styles for the text */
    & > * {
        position: relative;
        z-index: 1; /* Ensure the text is above the underline */
    }
    /* Define the styles for the underline */
    &::after {
        width: ${({ isActive }) => (isActive ? '100%' : '0')}; /* If active, set width to 100%, otherwise 0 */
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px; /* Adjust this value based on your design */
        width: 0; /* Initial width */
        height: 2px; /* Thickness of the underline */
        background-color: #71B1CD; /* Color of the underline */
        transition: width 0.3s; /* Smooth transition for the width change */
    }
    /* Apply the underline animation on hover */
    &:hover::after {
        width: 100%; /* Expand the width on hover */
    }
`;
const LoginButton = s.button`
    color: #71B1CD;
    font-family: ${daFont.style.fontFamily};
    font-size: 24px;
    font-style: normal;
    line-height: normal;
    padding-left: 22px;
    padding-right: 22px;
    margin-right: 24px;
    border-radius: 8px;
    border: 1px solid #71B1CD;

    &:hover {
        color: #020307;
        background-color: #71B1CD;
    }
`;

export default function NavBar() {
    const router = useRouter();
    function handleClick(route) {
        router.push(route);
    }
    return(
        <NavigationContainer>
            <NavBarItems>
                <TabHeader onClick={() => handleClick('/')}>(home)</TabHeader>
                <TabHeader onClick={() => handleClick('artists')}>(artists)</TabHeader>
                <TabHeader onClick={() => handleClick('about')}>(about)</TabHeader>
                <TabHeader onClick={() => handleClick('contact')}>(contact)</TabHeader>
            </NavBarItems>
            <LoginButton onClick={() => handleClick('login')}>login</LoginButton>
        </NavigationContainer>
    )
}
