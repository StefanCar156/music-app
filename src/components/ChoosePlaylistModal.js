import React from "react"
import { BiArrowBack } from "react-icons/bi"
import { useGlobalContext } from "../context"

const ChoosePlaylistModal = () => {
  const {
    playlists,
    handleAddSongToPlaylist,
    handleClosePlaylistChoicesModal,
  } = useGlobalContext()
  return (
    <div className="choose-playlist-modal">
      <button
        className="close-playlist-modal-btn"
        onClick={() => handleClosePlaylistChoicesModal()}
      >
        <BiArrowBack />
      </button>
      <h1 className="choose-playlist-modal-title">Add to playlist</h1>
      <ul className="choose-playlist-list">
        {playlists.map((playlist) => {
          const { id, title } = playlist
          return (
            <li
              className="choose-playlist-item"
              key={id}
              onClick={() => handleAddSongToPlaylist(id)}
            >
              {title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChoosePlaylistModal
