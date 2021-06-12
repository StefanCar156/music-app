import React, { useEffect } from "react"
import { useGlobalContext } from "../context"
import Header from "./Header"
import SearchedSong from "./SearchedSong"

const SearchedSongs = () => {
  const { setActiveScreen, searchedSongs, searchValue } = useGlobalContext()
  useEffect(() => {
    setActiveScreen("Search results")
  }, [])
  return (
    <div className="searched-songs">
      <Header />
      <ul className="searched-songs-list">
        {searchedSongs.length === 0 ? (
          <p className="no-songs-message">
            No songs that match "{searchValue}"
          </p>
        ) : null}
        {searchedSongs.map((song) => {
          return <SearchedSong props={song} key={song.id} />
        })}
      </ul>
    </div>
  )
}

export default SearchedSongs
