import React, { useEffect } from "react"
import FavoriteSong from "./FavoriteSong"
import { useGlobalContext } from "../context"
import Header from "./Header"

const FavoriteSongs = () => {
  const {
    finalSongsOrder,
    favoriteSongs,
    setActiveScreen,
    setOptionsID,
    setIsOptionsModalOpen,
    setSearchValue,
  } = useGlobalContext()
  useEffect(() => {
    setActiveScreen("Favorite songs")
    setOptionsID(null)
    setIsOptionsModalOpen(false)
    setSearchValue("")
  }, [])

  return (
    <div className="all-songs">
      <Header />
      <ul className="all-songs-list">
        {favoriteSongs.length === 0 ? (
          <p className="no-songs-message">No favorite songs</p>
        ) : null}
        {finalSongsOrder.map((song) => {
          for (let i = 0; i < favoriteSongs.length; i++) {
            if (song.id === favoriteSongs[i]) {
              return <FavoriteSong props={song} key={song.id} />
            }
          }
        })}
      </ul>
    </div>
  )
}

export default FavoriteSongs
