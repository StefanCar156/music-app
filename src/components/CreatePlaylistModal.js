import React from "react"
import { useGlobalContext } from "../context"

const CreatePlaylistModal = () => {
  const {
    newPlaylistTitle,
    setNewPlaylistTitle,
    setIsNewPlaylistModalOpen,
    handleCreateNewPlaylist,
    canConfirmPlaylistTitle,
  } = useGlobalContext()
  return (
    <div className="create-playlist-modal">
      <h1 className="create-playlist-modal-title">Playlist title</h1>
      <p className="create-playlist-modal-subtitle">Enter playlist title</p>
      <input
        type="text"
        className="playlist-title-input"
        value={newPlaylistTitle}
        onChange={(e) => setNewPlaylistTitle(e.target.value)}
        maxLength="25"
      />
      <div className="playlist-modal-btns">
        <button
          className={`playlist-confirm-btn ${
            newPlaylistTitle.length > 0 &&
            canConfirmPlaylistTitle &&
            `playlist-confirm-btn-active`
          }`}
          onClick={() => handleCreateNewPlaylist()}
        >
          Confirm
        </button>
        <button
          className="playlist-cancel-btn"
          onClick={() => setIsNewPlaylistModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default CreatePlaylistModal
