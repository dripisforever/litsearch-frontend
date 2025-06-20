// REFERENCE https://github.com/zainbinfurqan/custom-video-player-contorl-panel/blob/main/MediaPlayer

import ReactPlayer from 'react-player';
import React, { useState } from 'react';

const MediaPlayer = () => {
  const [currentSeek, setCurrentSeek] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [volumeBar, setVolumeBar] = useState(100);
  const [totalDurationOfVideo, setTotalDurationOfVideo] = useState(0);

  const handlePause = async (e) => {
    setIsPlay(false);
    const data = {
      play: false,
      pause: true,
      isVideoPlayed: false,
      currentTime: currentSeek,
      actionBy: "host",
    };
    await db
      .collection("events")
      .doc(this.props.WatchParty.firebaseEventId)
      .update(data);
  };

  const handlePlay = async (e) => {
    if (totalDurationOfVideo === 0) {
      setTotalDurationOfVideo(this.hostVideo.current.getDuration());
    }
    setIsPlay(true);
    const data = {
      play: true,
      pause: false,
      isVideoPlayed: true,
      currentTime: this.state.currentSeek,
      actionBy: "host",
    };
    await db
      .collection("events")
      .doc(this.props.WatchParty.firebaseEventId)
      .update(data);
  };

  const handleSeekChange = async (e) => {
    setCurrentSeek(e.target.value);
    this.hostVideo.current.seekTo(e.target.value);
    const data = {
      currentTime: e.target.value,
      actionBy: "host",
    };
    await db
      .collection("events")
      .doc(this.props.WatchParty.firebaseEventId)
      .update(data);
  };

  const handleVolumeChange = async (e) => {
    setVolumeBar(e.target.value);
    const data = {
      volume: e.target.value / 100,
      actionBy: "host",
    };
    await db
      .collection("events")
      .doc(this.props.WatchParty.firebaseEventId)
      .update(data);
  };

  return (
    <div
      className="player"
      style={{
        width: "100%",
        height: "92%",
      }}
    >
      <ReactPlayer
        url={this.state.videoUrl}
        width="100%"
        height="100%"
        volume={volume}
        muted={muted}
        onError={this.handleError}
        onReady={(e) => this.handleVideoReady(e)}
        ref={this.hostVideo}
        // onProgress={this.handleProgress}
        playing={this.state.isPlay}
        onProgress={(e) => this.handleOnProgress(e)}
      />

      <CustomVideoPlayerControlPanel
        currentSeek={currentSeek}
        playing={isPlay}
        volume={volumeBar}
        handlePause={(e) => this.handlePause(e)}
        handlePlay={(e) => this.handlePlay(e)}
        handleSeekChange={this.handleSeekChange}
        totalDurationOfVideo={totalDurationOfVideo}
        handleVolumeChange={this.handleVolumeChange}
      />
    </div>
  );
};

export default CustomVideoPlayerControlPanel;
