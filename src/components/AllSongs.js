import React, { useEffect } from "react"
import ListSong from "./ListSong"
import Header from "./Header"
import { useGlobalContext } from "../context"

const AllSongs = () => {
  const {
    setActiveScreen,
    setIsOptionsModalOpen,
    setOptionsID,
    songs,
    setSearchValue,
  } = useGlobalContext()
  useEffect(() => {
    setActiveScreen("All songs")
    setOptionsID(null)
    setIsOptionsModalOpen(false)
    setSearchValue("")
  }, [])

  return (
    <div className="all-songs">
      <Header />
      <ul className="all-songs-list">
        {songs.length === 0 ? (
          <p className="no-songs-message">No songs</p>
        ) : null}
        {songs.map((song) => {
          return <ListSong props={song} key={song.id} />
        })}
      </ul>
    </div>
  )
}

export default AllSongs
