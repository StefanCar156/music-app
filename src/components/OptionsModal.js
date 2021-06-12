import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"

const OptionsModal = () => {
  const {
    handleAddSongToFavorites,
    addOrRemoveOption,
    handleOpenPlaylistChoicesModal,
    activeScreen,
    handleRemoveSongFromPlaylist,
  } = useGlobalContext()

  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)

  useEffect(() => {
    if (activeScreen === "All songs" || activeScreen === "Favorite songs") {
      setIsPlaylistOpen(false)
    } else {
      setIsPlaylistOpen(true)
    }
  }, [])

  return (
    <ul className="options-modal">
      <li
        className="options-modal-item"
        onClick={() => handleAddSongToFavorites()}
      >
        {addOrRemoveOption}
      </li>
      <li
        className="options-modal-item"
        onClick={() => handleOpenPlaylistChoicesModal()}
      >
        Add to playlist
      </li>
      {isPlaylistOpen ? (
        <li
          className="options-modal-item"
          onClick={() => handleRemoveSongFromPlaylist()}
        >
          Remove from this playlist
        </li>
      ) : null}
    </ul>
  )
}

export default OptionsModal
