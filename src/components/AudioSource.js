import React, { useEffect } from "react"
import { useGlobalContext } from "../context"

const AudioSource = () => {
  const {
    isSongPlaying,
    setIsSongPlaying,
    volume,
    setCurrentTime,
    setCurrentSongDuration,
    newCurrentTime,
    currentSongObject,
    currentAudioSrc,
    setCurrentAudioSrc,
    handleNextSong,
  } = useGlobalContext()
  const song = document.querySelector(".song-playing")

  // Get Song Duration
  const handleSongDuration = () => {
    setCurrentSongDuration(song.duration)
  }

  // Change Current Time on Seek
  useEffect(() => {
    if (song) {
      song.currentTime = newCurrentTime
    }
  }, [newCurrentTime])

  // Play/Pause Song
  useEffect(() => {
    if (song) {
      isSongPlaying ? song.play() : song.pause()
    }
  }, [isSongPlaying])

  // Change Song Volume
  useEffect(() => {
    if (song) {
      song.volume = volume / 100
    }
  }, [volume])

  // Get Current Time
  setInterval(() => {
    if (song) {
      setCurrentTime(song.currentTime)
    }
  }, 1000)

  // Reset Stream when Song Changes
  useEffect(() => {
    if (song && isSongPlaying) {
      song.pause()
      setCurrentAudioSrc(currentSongObject.source)
      song.currentTime = 0
      song.load()
      song.play()
      setIsSongPlaying(true)
    }
  }, [currentSongObject])

  return (
    <audio
      className="song-playing"
      preload="metadata"
      onLoadedMetadata={() => handleSongDuration()}
      // When song ends, play next one
      onEnded={() => handleNextSong()}
    >
      <source src={currentAudioSrc} />
    </audio>
  )
}

export default AudioSource
