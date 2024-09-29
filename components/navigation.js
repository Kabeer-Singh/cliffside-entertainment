import React, { useCallback, useState, useEffect } from "react";
import s from "styled-components";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { Oswald } from "next/font/google";
const daFont = Oswald({ subsets: ["latin"], weight: "300" });
import Image from "next/image";
import logoImage from "../public/logos/logoNoText.png";

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
  align-self: center;
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
  background: #2B61B1;
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
    width: ${({ isActive }) => (isActive ? "100%" : "0")};
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background: #2B61B1;
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
  padding: 5px 22px;
  margin-left: 10px;
  color: #2B61B1;
  background: none;
  border: 2px solid #2B61B1;
  cursor: pointer;
  box-shadow: none;
  text-align: center;
  margin-right: 24px !important;
  transition: 0.3s;
  transition-timing-function: ease-in-out;
  
  &:hover {
    background: #2B61B1;
    border: 2px solid white;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Reduce font size for smaller screens */
    padding: 5px 15px; /* Adjust padding */
    margin-right: 24px !important;
    white-space: nowrap; /* Ensure the text stays on a single line */
  }
`;

const DrawerToggle = s.div`
  font-size: 50px;
  color: black;
  background: white;
  border: none;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 70px;
`;

const Drawer = s.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: var(--backgroundGradient2);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (min-width: 768px) {
    width: 300px; /* Adjust as per your design */
    height: 100%; 
  }
  nav {
    margin-top: 10vh;
    margin-left: 5vw;
  }
    nav ul {
    list-style-type: none;
    padding: 0;
    text-transform: uppercase;
    
  }

  nav ul li {
    margin-bottom: 1vh;
    padding-bottom: 0px;
  }

  nav ul li a {
    font-family: ${daFont.style.fontFamily};
    cursor: pointer;
    color: white;
    text-decoration: none;
    font-size: 45px;
    &:hover {
      color: gray;
    }
  }
`;

const Logo = React.memo(() => (
  <Image
    alt="logo"
    src={logoImage}
    width={45} // Assuming this is in pixels
    height={45} // Set height explicitly for better control
    style={{
      position: "absolute",
      left: "50vw", // Move the center of the logo to the center of the page
      transform: "translateX(-50%)", // Adjust to perfectly center the logo
      cursor: "pointer",
    }}
  />
));


const LogoDesktop = React.memo(() => (
  <Image
    alt="logo"
    src={logoImage}
    width={45} // Assuming this is in pixels
    height={45} // Set height explicitly for better control
    style={{
      position: "absolute",
      left: "50%", // Move the center of the logo to the center of the page
      transform: "translateX(-50%)", // Adjust to perfectly center the logo
      cursor: "pointer",
    }}
  />
));

const NavBar = React.memo(() => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const threeLines = drawerOpen ? "\u2715" : "\u2630";

  const handleClick = useCallback(
    (route) => {
      router.push(route);
    },
    [router]
  );

  const handleLogout = useCallback(() => {
    auth.signOut();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setDrawerOpen(false); // Close the drawer when switching to desktop
    }
  }, []);

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  if (isMobile) {
    return (
      <>
        <DrawerToggle isOpen={drawerOpen}>
          <span
            style={{ cursor: "pointer", flexBasis: "0", color: "#2B61B1" }}
            onClick={toggleDrawer}
          >
            {threeLines}
          </span>
          <NavBarCenter onClick={() => handleClick("/")}>
            <Logo style={{top: '55px !important'}}/>
          </NavBarCenter>

          {user ? (
            <></>
          ) : (
            <LoginButton
              style={{ flexBasis: "0" }}
              onClick={() => handleClick("login")}
            >
              LOG IN
            </LoginButton>
          )}
        </DrawerToggle>
        <Drawer isOpen={drawerOpen}>
          <nav>
            <ul>
              <li>
                <a
                  onClick={() => {
                    toggleDrawer();
                    handleClick("/");
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    toggleDrawer();
                    handleClick("about");
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    toggleDrawer();
                    handleClick("contact");
                  }}
                >
                  Contact
                </a>
              </li>
              {user ? (
                <>
                  <li>
                    <a
                      onClick={() => {
                        toggleDrawer();
                        handleClick("dashboard");
                      }}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        toggleDrawer();
                        handleLogout();
                      }}
                    >
                      Log out
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <a
                    onClick={() => {
                      toggleDrawer();
                      handleClick("login");
                    }}
                  >
                    LOG IN
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </Drawer>
      </>
    );
  }

  return (
    <NavigationContainer>
      <NavBarLeft>
        <TabHeader onClick={() => handleClick("/")}>HOME</TabHeader>
        <TabHeader onClick={() => handleClick("about")}>ABOUT</TabHeader>
        <TabHeader onClick={() => handleClick("contact")}>CONTACT</TabHeader>
      </NavBarLeft>

      <NavBarCenter
        onClick={() => handleClick("/")}
        style={{ marginRight: "35px" }}
      >
        <LogoDesktop style={{top: "1.25vh"}}/>
      </NavBarCenter>

      <NavBarRight>
        {user ? (
          <>
            <LoginButton onClick={() => handleClick("dashboard")}>
              dashboard
            </LoginButton>
            <LoginButton onClick={handleLogout}>log out</LoginButton>
          </>
        ) : (
          <LoginButton onClick={() => handleClick("login")}>LOG IN</LoginButton>
        )}
      </NavBarRight>
    </NavigationContainer>
  );
});

export default NavBar;
