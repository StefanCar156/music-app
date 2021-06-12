import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import Header from "./Header"
import PlaylistSong from "./PlaylistSong"

const Playlist = () => {
  const { playlists, currentPlaylistID, sortBy, songs } = useGlobalContext()
  const [playlistSongsData, setPlaylistSongsData] = useState([])
  const [playlistSorted, setPlaylistSorted] = useState([])
  let playlistSongs = []

  playlists.map((playlist) => {
    if (playlist.id === currentPlaylistID) {
      playlistSongs = playlist.songs
    }
  })

  // Get Songs Data Based on Provided IDs
  let arr = []
  useEffect(() => {
    songs.map((song) => {
      playlistSongs.map((plSongID) => {
        if (plSongID === song.id) {
          arr.push(song)
        }
      })
    })
    setPlaylistSongsData(arr)
  }, [sortBy])

  // Sort Songs
  useEffect(() => {
    switch (sortBy) {
      case "sort-n-a":
        setPlaylistSorted(
          playlistSongsData.sort((a, b) => (a.name > b.name ? 1 : -1))
        )
        break
      case "sort-n-d":
        setPlaylistSorted(
          playlistSongsData.sort((a, b) => (a.name < b.name ? 1 : -1))
        )
        break
      case "sort-d-a":
        setPlaylistSorted(
          playlistSongsData.sort((a, b) => (a.id > b.id ? 1 : -1))
        )
        break
      case "sort-d-d":
        setPlaylistSorted(
          playlistSongsData.sort((a, b) => (a.id < b.id ? 1 : -1))
        )
        break
      default:
        setPlaylistSorted(
          playlistSongsData.sort((a, b) => (a.name > b.name ? 1 : -1))
        )
        break
    }
  }, [playlistSongsData, sortBy])

  return (
    <div className="playlist">
      <Header />
      <ul className="playlist-list">
        {playlistSorted.map((song) => {
          return <PlaylistSong key={song.id} props={song} />
        })}
      </ul>
    </div>
  )
}

export default Playlist
