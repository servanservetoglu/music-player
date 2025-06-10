import React, { useState, useRef, useEffect } from "react";
import styles from "./podcast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faRotateBack,
  faRotateForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

interface PodcastItem {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  musicListLength: number;
  currentMusic: {
    name: string;
    singer: string;
    file: string;
  };
}

function PodcastNavbar({
  currentIndex,
  musicListLength,
  setCurrentIndex,
  currentMusic,
}: PodcastItem) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef?.current?.pause();
    } else {
      audioRef?.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const prevTrack = () => {
    const newIndex =
      currentIndex === 0 ? musicListLength - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    const newIndex =
      currentIndex === musicListLength - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setIsPlaying(true);
  };

  const calculateTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedSeconds = secs < 10 ? `0${secs}` : `${secs}`;
    return `${minutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      audio?.duration && setDuration(audio?.duration);
    };

    const handleTimeUpdate = () => {
      audio?.currentTime && setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio?.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio?.addEventListener("timeupdate", handleTimeUpdate);
    audio?.addEventListener("ended", handleEnded);

    return () => {
      audio?.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentIndex, isPlaying]);

  let progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.navbarAlign}>
      <audio ref={audioRef} src={currentMusic?.file} preload="metadata" />
      <div className={styles.songDetail}>
        <div className={styles.songWrapper}>
          <h2 className={styles.songText}>{currentMusic.name}</h2>
        </div>
        <p className={styles.singerText}>{currentMusic.singer}</p>
      </div>

      <div className={styles.timerAlign}>
        <div className={styles.timer}>
          <span>{calculateTime(currentTime)}</span>
          <span>{calculateTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className={`${styles.shadowSliderSize} ${styles.shadowSlider}`}
          style={
            {
              "--progress": `${progressPercentage}%`,
            } as React.CSSProperties
          }
        />
      </div>

      <div className={styles.buttonStyle}>
        <button onClick={prevTrack}>
          <FontAwesomeIcon icon={faBackward} size="2x" />
        </button>
        <button
          onClick={() => {
            if (audioRef?.current) {
              audioRef.current.currentTime =
                audioRef?.current?.currentTime - 30;
            }
          }}
        >
          <FontAwesomeIcon icon={faRotateBack} size="2x" />
        </button>
        <button onClick={togglePlay}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faPlay} size="2x" />
          )}
        </button>

        <button
          onClick={() => {
            if (audioRef?.current) {
              audioRef.current.currentTime =
                audioRef?.current?.currentTime + 30;
            }
          }}
        >
          <FontAwesomeIcon icon={faRotateForward} size="2x" />
        </button>
        <button onClick={nextTrack}>
          <FontAwesomeIcon icon={faForward} size="2x" />
        </button>
      </div>
    </div>
  );
}

export default PodcastNavbar;
