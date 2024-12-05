import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true); // Play if the video is in focus
        } else {
          setIsPlaying(false); // Pause if the video is out of focus
        }
      },
      { threshold: 0.7 } // 70% of the video should be visible to play
    );

    if (playerRef.current) {
      observer.observe(playerRef.current);
    }

    return () => {
      if (playerRef.current) {
        observer.unobserve(playerRef.current);
      }
    };
  }, []);

  return (
    <div className="videoCard" ref={playerRef}>
      <ReactPlayer
        url={video.url}
        playing={isPlaying}
        loop={true}
        controls={false}
        muted={true}
        width="100%"
        height="100%"
        className="videoCard__player"
      />
      <div className="videoCard__info">
        <h4>{video.title}</h4>
        <p>{video.description}</p>
      </div>
      <div className="videoCard__controls">
        <button>❤️</button>
        <button>💬</button>
        <button>🔗</button>
      </div>
    </div>
  );
};

export default VideoCard;
