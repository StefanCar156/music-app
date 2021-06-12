import React from "react"
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs"
import { useGlobalContext } from "../context"
import { Link } from "react-router-dom"

const MiniPlayer = () => {
  const { isSongPlaying, setIsSongPlaying, currentSongObject } =
    useGlobalContext()

  let { name, artist, coverSmall } = currentSongObject
  if (!coverSmall) {
    coverSmall = "./img/default-cover-small.jpg"
  }

  let linkStyle = {
    textDecoration: "none",
  }

  return (
    <div className="mini-player">
      <img
        src={coverSmall}
        alt=""
        className={`mini-player-thumbnail ${
          isSongPlaying && `mini-player-thumbnail-rotation`
        }`}
      />
      <Link to="/song" style={linkStyle}>
        <div className="mini-player-details">
          <p className="mini-player-artist">{artist}</p>
          <p className="mini-player-name">{name}</p>
        </div>
      </Link>
      <button
        className="mini-player-btn"
        onClick={() => setIsSongPlaying(!isSongPlaying)}
      >
        {isSongPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
      </button>
    </div>
  )
}

export default MiniPlayer
