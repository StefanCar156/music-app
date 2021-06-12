import React from "react"
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useGlobalContext } from "../context"

const SortByModal = () => {
  const { setIsSortByModalOpen, handleSortBy, activeSortBy } =
    useGlobalContext()
  const sortOptions = [
    {
      text: "Name ascending",
      svg: <AiOutlineSortAscending />,
      optionID: "sort-n-a",
    },
    {
      text: "Name descending",
      svg: <AiOutlineSortDescending />,
      optionID: "sort-n-d",
    },
    {
      text: "Date ascending",
      svg: <HiOutlineSortAscending />,
      optionID: "sort-d-a",
    },
    {
      text: "Date descending",
      svg: <HiOutlineSortDescending />,
      optionID: "sort-d-d",
    },
  ]

  return (
    <div className="sort-by-modal">
      <button
        className="close-sort-by-modal-btn"
        onClick={() => setIsSortByModalOpen(false)}
      >
        <BiArrowBack />
      </button>
      <h1 className="sort-by-modal-title">Sort by</h1>
      <ul className="sort-by-options-list">
        {sortOptions.map((option) => {
          const { text, svg, optionID } = option
          return (
            <li
              key={optionID}
              className={`sort-by-option ${
                activeSortBy === optionID && `sort-by-option-active`
              }`}
              id={optionID}
              onClick={(e) => handleSortBy(e)}
            >
              {svg} {text}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SortByModal
