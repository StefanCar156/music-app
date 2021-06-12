import React from "react"
import { FaTrashAlt, FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context"

const PlaylistThumbnail = ({ props }) => {
  const {
    handleRemovePlaylist,
    handleChangePlaylistTitle,
    handleCurrentPlaylist,
  } = useGlobalContext()
  const { id, title, songs } = props
  const linkStyle = {
    textDecoration: "none",
  }

  return (
    <li className="playlist-thumbnail">
      <div className="playlist-thumbnail-btns">
        <button
          className="remove-playlist-btn"
          onClick={() => handleRemovePlaylist(id)}
        >
          <FaTrashAlt />
        </button>
        <button
          className="edit-playlist-btn"
          onClick={() => handleChangePlaylistTitle(id, title)}
        >
          <FaEdit />
        </button>
      </div>
      <Link
        to="/playlist"
        style={linkStyle}
        onClick={() => handleCurrentPlaylist(id, title, songs)}
      >
        <img
          src="./img/default-cover-large.jpg"
          alt=""
          className="playlist-thumbnail-img"
        />
        <h3 className="playlist-thumbnail-title">{title}</h3>
        <p className="playlist-thumbnail-length">{songs.length} songs</p>
      </Link>
    </li>
  )
}

export default PlaylistThumbnail
