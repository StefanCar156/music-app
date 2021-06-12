import React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useGlobalContext } from "../context"
import OptionsModal from "./OptionsModal"

const SearchedSong = ({ props }) => {
  let { id, name, artist, coverSmall } = props
  const { handleOpenModal, isOptionsModalOpen, optionsID, handleChooseSong } =
    useGlobalContext()
  const displayModal = (e) => {
    handleOpenModal(e, id)
  }

  if (!coverSmall) {
    coverSmall = "./img/default-cover-small.jpg"
  }

  return (
    <li
      className="list-song searched-song"
      onClick={(e) => handleChooseSong(e, id)}
    >
      <img src={coverSmall} className="list-song-thumbnail" alt={name} />
      <div className="list-song-details">
        <p className="list-song-artist">{artist}</p>
        <p className="list-song-name">{name}</p>
      </div>
      <button className="list-song-options-btn" onClick={displayModal}>
        <BsThreeDotsVertical />
      </button>
      {isOptionsModalOpen && id === optionsID ? <OptionsModal /> : null}
    </li>
  )
}

export default SearchedSong
