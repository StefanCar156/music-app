import React, { useEffect } from "react"
import { FaAngleDown } from "react-icons/fa"
import { ImPrevious2, ImNext2 } from "react-icons/im"
import { HiPlay, HiPause } from "react-icons/hi"
import { IoVolumeOff, IoVolumeMedium } from "react-icons/io5"
import { BiShuffle } from "react-icons/bi"
import { useGlobalContext } from "../context"

const SongContainer = () => {
  const {
    volume,
    currentTime,
    setCurrentTime,
    currentTimePercentage,
    setVolume,
    displayCurrentTime,
    currentSongDuration,
    displaySongDuration,
    isSongPlaying,
    setIsSongPlaying,
    handleTimeSeek,
    currentSongObject,
    setActiveScreen,
    handlePrevSong,
    handleNextSong,
    isShuffleOn,
    setIsShuffleOn,
  } = useGlobalContext()

  useEffect(() => {
    setActiveScreen("")
  }, [])

  let { name, artist, coverLarge } = currentSongObject

  if (!coverLarge) {
    coverLarge = "./img/default-cover-large.jpg"
  }

  return (
    <div className="song-container">
      <button className="close-song-btn" onClick={() => window.history.back()}>
        <FaAngleDown />
      </button>
      <img src={coverLarge} alt="song" className="song-container-img" />
      <div className="song-container-main">
        <div className="song-container-top">
          <div className="song-container-info">
            <p className="song-container-artist">{artist}</p>
            <p className="song-container-name">{name}</p>
          </div>
          <button
            className={`small-shuffle-btn ${
              isShuffleOn && `small-shuffle-btn-active`
            }`}
            onClick={() => setIsShuffleOn(!isShuffleOn)}
          >
            <BiShuffle />
          </button>
        </div>
        <div className="song-duration">
          <div className="duration-bar">
            <div
              className="duration-fill-progress"
              style={{ width: currentTimePercentage + "%" }}
            ></div>
            <input
              type="range"
              name="duration-range"
              className="duration-range"
              value={currentTime}
              max={currentSongDuration}
              onChange={(e) => setCurrentTime(e.target.value)}
              onInput={(e) => handleTimeSeek(e)}
            />
          </div>
          <div className="duration-time">
            <span className="current-time">{displayCurrentTime}</span>
            <span className="total-time">{displaySongDuration}</span>
          </div>
        </div>
        <div className="song-cta">
          <button
            className="previous-song-btn"
            onClick={() => handlePrevSong()}
          >
            <ImPrevious2 />
          </button>
          <button
            className="play-song-btn"
            onClick={() => setIsSongPlaying(!isSongPlaying)}
          >
            {isSongPlaying ? <HiPause /> : <HiPlay />}
          </button>
          <button className="next-song-btn" onClick={() => handleNextSong()}>
            <ImNext2 />
          </button>
        </div>
        <div className="song-volume">
          <div className="volume-bar">
            <div
              className="volume-fill-progress"
              style={{ width: volume + "%" }}
            ></div>
            <input
              type="range"
              name="volume-range"
              className="volume-range"
              value={volume}
              max="100"
              onChange={(e) => setVolume(e.target.value)}
            />
          </div>
          <div className="volume-icons">
            <span className="low-volume">
              <IoVolumeOff />
            </span>
            <span className="high-volume">
              <IoVolumeMedium />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongContainer
