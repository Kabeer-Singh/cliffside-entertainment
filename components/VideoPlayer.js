import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ src, type, style }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      // Optional: You can add custom logic here if needed when the video ends
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      style={style}
      loop // Add the loop attribute to restart the video automatically
      src={src}
      type={type}
      playsInline
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
