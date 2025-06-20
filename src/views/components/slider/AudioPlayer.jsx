// REFERENCE https://www.youtube.com/watch?v=sqpg1qzJCGQ&t=654s
import React, { useState, useRef, useEffect } from 'react'
import styles from './AudioPlayer.module.css';
import { BsArrowLeftShort } from 'react-icons/bs'
import { BsArrowRightShort } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import styled from 'styled-components';

const Wrapper = styled.div`

`;

const StyledPlayPause = styled.button`

`;

const StyledForwardButton = styled.button`

`;

const StyledBackwardButton = styled.button`

`;

const StyledInput = styled.input`

`;

const StyledCurrentTime = styled.div`

`;

const StyledDuration = styled.div`

`;

const StyledProgressBar = styled.div`

`;


const AudioPlayer = ({ stopSong, pauseSong, resumeSong, audioControl, audio_source_url }) => {
// const AudioPlayer = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {

    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;

  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  }

  // const audio_source_url = `
  //   https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/
  //   episodes/af52a99b-88c0-4638-b120-d46e142d06d3/
  //   audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3
  // `
  // const audio_source_url = `https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3`
  return (
    <Wrapper className={styles.audioPlayer}>
      <audio
        ref={audioPlayer}
        src={audio_source_url}
        preload="metadata"
      >

      </audio>

      <StyledBackwardButton className={styles.forwardBackward} onClick={backThirty}>
        <BsArrowLeftShort /> 30
      </StyledBackwardButton>

      <StyledPlayPause onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
      </StyledPlayPause>

      <StyledForwardButton className={styles.forwardBackward} onClick={forwardThirty}>
        30 <BsArrowRightShort />
      </StyledForwardButton>

      {/* current time */}
      <StyledCurrentTime className={styles.currentTime}>
        {calculateTime(currentTime)}
      </StyledCurrentTime>

      {/* progress bar */}
      <StyledProgressBar>
        <StyledInput
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </StyledProgressBar>

      {/* duration */}
      <StyledDuration className={styles.duration}>
        {(duration && !isNaN(duration)) && calculateTime(duration)}
      </StyledDuration>
    </Wrapper>
  )
}

export default  AudioPlayer
