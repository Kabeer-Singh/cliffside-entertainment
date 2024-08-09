import React, { useCallback } from "react";
import s from "styled-components";
import { useRouter } from "next/navigation";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Oswald } from "next/font/google";
const daFont = Oswald({ subsets: ['latin'], weight: '300' });
import Image from 'next/image';
import logoImage from '../public/logos/logoNoText.png';

// Styled components
const NavigationContainer = s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7vh;
  width: 100vw;
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 1000;
  padding: 0 24px;
  margin-bottom: 3vh;
`;

const NavBarItems = s.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBarLeft = s.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  margin-left: 24px;
`;

const NavBarCenter = s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const NavBarRight = s.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const TabHeader = s.div`
  font-family: ${daFont.style.fontFamily};
  background: var(--backgroundGradient, linear-gradient(180deg, #3E517C 30%, #4A527A 60%, #142E54 100%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 5.04px;
  font-size: 20px;
  margin-right: 34px;
  position: relative;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  &::after {
    width: ${({ isActive }) => (isActive ? '100%' : '0')};
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background: linear-gradient(180deg, #3E517C 30%, #4A527A 60%, #142E54 100%);
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }
`;

const LoginButton = s.button`
  font-family: ${daFont.style.fontFamily};
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 5.04px;
  padding: 5px 22px;
  margin-left: 10px;
  color: white;
  background: var(--backgroundGradient2);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: none;
  text-align: center;
  margin-right: 24px;
`;

// Memoized Logo component
const Logo = React.memo(() => (
  <Image
    alt="logo"
    src={logoImage}
    width={45}
    height="auto"
    style={{ marginRight: '37px' }}
  />
));

const NavBar = React.memo(() => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleClick = useCallback((route) => {
    router.push(route);
  }, [router]);

  const handleLogout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <NavigationContainer>
      <NavBarLeft>
        <TabHeader onClick={() => handleClick('/')}>HOME</TabHeader>
        <TabHeader onClick={() => handleClick('artists')}>ARTISTS</TabHeader>
        <TabHeader onClick={() => handleClick('about')}>ABOUT</TabHeader>
        <TabHeader onClick={() => handleClick('contact')}>CONTACT</TabHeader>
      </NavBarLeft>
      <NavBarCenter>
        <Logo />
      </NavBarCenter>
      <NavBarRight>
        {user ? (
          <>
            <LoginButton onClick={() => handleClick('dashboard')}>dashboard</LoginButton>
            <LoginButton onClick={handleLogout}>logout</LoginButton>
          </>
        ) : (
          <LoginButton onClick={() => handleClick('login')}>LOGIN</LoginButton>
        )}
      </NavBarRight>
    </NavigationContainer>
  );
});
export default NavBar;
