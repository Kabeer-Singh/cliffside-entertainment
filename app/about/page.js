"use client";
import NavBar from "../../components/navigation";
import {
  PageContainer,
  InfoContainer,
  InfoContainerAbout,
  TitleContainer,
  ImageParagraphContainer,
  ContactUsButton,
  TheCard,
  MainContainer,
  TheFront,
  TheBack,
  CardsContainer,
  Stroke,
  BackCardContainer,
  Ocean,
  Wave,
} from "@/components/styled-components";
import s from "styled-components";
import VideoPlayer from "@/components/VideoPlayer";
import { useCallback, useEffect, useState } from "react";

// Update video styles to cover the entire viewport
const videoStyles = {
  width: "100vw",
  marginTop: "7vh",
  height: "100vh", // Make the video fill the entire height of the viewport
  position: "fixed", // Keep the video fixed in place
  top: 0,
  left: 0,
  objectFit: "cover",
};

const videoStylesMobile = {
  width: "100vw",
  height: "100vh", // Ensure the video fills the viewport
  position: "fixed", // Keep the video fixed in place
  top: "50%", // Vertically center the video
  left: "50%", // Horizontally center the video
  objectFit: "scale-down", // Make sure the video covers the viewport without stretching
  transform: "translate(-50%, -50%) scale(1.55)", // Zoom the video by 20% and keep it centered
  transformOrigin: "center", // Ensure the zoom happens from the center of the video
};

const PageContainerEdited = s(PageContainer)`
  flex-flow: column nowrap;
  justify-content: start;
  height: 2000vh;
  overflow-y: scroll;
  background: none;
  scroll-snap-type: y mandatory;  // Ensure the scroll snapping works vertically
  scroll-snap-stop: always;  // Force the snap to complete and stop at each section
`;

const Background1 = s.div`
  background: var(--backgroundGradient2);
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;  // Ensure snapping starts at the top of the viewport
`;

const Background2 = s.div`
  height: 100vh;
  width: 100vw;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  scroll-snap-align: start;  // Ensure snapping starts at the top of the viewport
`;

const Background3 = s.div`
  height: 100vh;
  width: 100vw;
  background-color: #FFE53B;
  background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);
  scroll-snap-align: start;  // Ensure snapping starts at the top of the viewport
`;

const Background4 = s.div`
  background-color: #021cff;
  background-image: linear-gradient(221deg, #021cff 0%, #8798c4 50%, #10c813 100%);
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;  // Ensure snapping starts at the top of the viewport
`;

const Background5 = s.div`
  background-color: #A9C9FF;
  background-image: linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%);
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;  // Ensure snapping starts at the top of the viewport
`;

const Background6 = s.div`
background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
background-color:  #A9C9FF;
height: 100vh;
width: 100vw;
`;
const Background7 = s.div`
  background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
  height: 100vh;
  width: 100vw;
`;

const Background8 = s.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%);
`;

const Background9 = s.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
`;

const Background10 = s.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to top, #cc208e 0%, #6713d2 100%);
`;

const Background11 = s.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%);
`;

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(null);

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const [videoSource, setVideoSource] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const getBrowser = () => {
      const userAgent = navigator.userAgent;

      if (
        userAgent.includes("Chrome") &&
        !userAgent.includes("Edge") &&
        !userAgent.includes("OPR")
      ) {
        return "Chrome";
      } else if (
        userAgent.includes("Safari") &&
        !userAgent.includes("Chrome")
      ) {
        return "Safari";
      } else {
        return "Other";
      }
    };

    const browser = getBrowser();

    if (browser === "Chrome") {
      setVideoSource(() => "/videos/chromeYolo.webm");
      setType(() => "video/webm");
      console.log("CHROME");
    } else if (browser === "Safari") {
      setVideoSource(() => "/videos/yolo.mov");
      setType(() => "video/quicktime");
      console.log("SAFARI");
    } else {
      setVideoSource(() => "/videos/chromeYolo.webm");
      setType(() => "video/webm");
    }
  }, []);

  // IntersectionObserver implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisibleEntry = null;

        // Find the div with the largest visible area
        entries.forEach((entry) => {
          if (
            !mostVisibleEntry ||
            entry.intersectionRatio > mostVisibleEntry.intersectionRatio
          ) {
            mostVisibleEntry = entry;
          }
        });

        // Set the most visible background to state
        if (mostVisibleEntry) {
          setCurrentBackground(mostVisibleEntry.target);
        }
      },
      {
        threshold: Array.from(Array(101), (_, i) => i / 100), // Create thresholds at every 1% of visibility
      }
    );

    const backgroundDivs = document.querySelectorAll(".background");
    backgroundDivs.forEach((div) => observer.observe(div));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const snapToTop = () => {
      if (currentBackground) {
        currentBackground.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(snapToTop, 150); // Snap after 150ms of no scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [currentBackground]);

  return (
    <PageContainerEdited>
      <NavBar />
      <VideoPlayer
        src={videoSource}
        type={type}
        style={isMobile ? videoStylesMobile : videoStyles}
      />
      <Background1 className="background"></Background1>
      <Background2 className="background"></Background2>
      <Background3 className="background"></Background3>
      <Background4 className="background"></Background4>
      <Background5 className="background"></Background5>
      <Background6 className="background"></Background6>
      <Background7 className="background"></Background7>
      <Background8 className="background"></Background8>
      <Background9 className="background"></Background9>
      <Background10 className="background"></Background10>
      <Background11 className="background"></Background11>
      <Background1 className="background"></Background1>
      <Background2 className="background"></Background2>
      <Background3 className="background"></Background3>
      <Background4 className="background"></Background4>
      <Background5 className="background"></Background5>
      <Background6 className="background"></Background6>
      <Background7 className="background"></Background7>
      <Background8 className="background"></Background8>
      <Background9 className="background"></Background9>
    </PageContainerEdited>
  );
}
