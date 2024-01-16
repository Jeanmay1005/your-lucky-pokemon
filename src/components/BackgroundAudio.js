import React, { useRef, useState } from "react";
import "./BackgroundAudio.css";
import backgroundMusic from "../assets/background-music.mp3";
import soundIcon from "../assets/sound-on.png";
import muteIcon from "../assets/mute.png";

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };
  return (
    <div>
      <audio
        loop={true}
        ref={audioRef}
        src={backgroundMusic}
        onPlay={handlePlay}
        onPause={handlePause}
      ></audio>
      <img
        alt="sound icon"
        className="icon"
        onClick={toggleMusic}
        src={isPlaying ? muteIcon : soundIcon}
      />
    </div>
  );
}
