import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ src, type, style }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      // When the video ends, seek to the last frame
      if (video.duration) {
        video.currentTime = video.duration;
      }
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
      onEnded={() => {
        const video = videoRef.current;
        // Pause at the last frame when the video ends
        video.currentTime = video.duration;
        video.pause();
      }}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
