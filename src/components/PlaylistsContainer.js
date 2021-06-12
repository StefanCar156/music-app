import React, { useEffect } from "react"
import { BiAddToQueue } from "react-icons/bi"
import { useGlobalContext } from "../context"
import PlaylistThumbnail from "./PlaylistThumbnail"

const PlaylistsContainer = () => {
  const { setActiveScreen, playlists, setIsNewPlaylistModalOpen } =
    useGlobalContext()
  useEffect(() => {
    setActiveScreen("Playlists")
  }, [])

  return (
    <div className="playlists-container">
      {playlists.length === 0 ? (
        <p className="no-songs-message">No playlists</p>
      ) : null}
      <h1 className="playlists-title">Playlists</h1>
      <button
        className="create-new-playlist-btn"
        onClick={() => setIsNewPlaylistModalOpen(true)}
      >
        <BiAddToQueue /> Create new playlist
      </button>
      <ul className="playlists-list">
        {playlists
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((playlist) => {
            return <PlaylistThumbnail key={playlist.id} props={playlist} />
          })}
      </ul>
    </div>
  )
}

export default PlaylistsContainer
