import React from "react"
import { FiSearch } from "react-icons/fi"
import { BiSort, BiShuffle } from "react-icons/bi"
import { useGlobalContext } from "../context"
import { Link } from "react-router-dom"

const Header = () => {
  const {
    activeScreen,
    isShuffleOn,
    setIsShuffleOn,
    setIsSortByModalOpen,
    searchValue,
    setSearchValue,
    isSearchInputActive,
    setIsSearchInputActive,
    handleSearch,
  } = useGlobalContext()

  const linkStyle = {
    textDecoration: "none",
    color: "#7971e9",
  }

  return (
    <header className="header">
      <h1 className="all-songs-title">{activeScreen}</h1>
      {activeScreen === "All songs" ? (
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchValue}
            onFocus={() => setIsSearchInputActive(true)}
            onChange={(e) => setSearchValue(e.target.value)}
            maxLength="30"
          />
          {isSearchInputActive ? (
            <button className="search-btn" onClick={(e) => handleSearch(e)}>
              {searchValue.length > 0 ? (
                <Link to="/search" style={linkStyle}>
                  Search
                </Link>
              ) : (
                `Cancel`
              )}
            </button>
          ) : (
            <FiSearch />
          )}
        </div>
      ) : null}
      <div className="all-songs-options">
        <button
          className={`shuffle-btn ${isShuffleOn && `shuffle-btn-active`}`}
          onClick={() => setIsShuffleOn(!isShuffleOn)}
        >
          <BiShuffle />
          Shuffle play
        </button>
        <button
          className="all-songs-sort-btn"
          onClick={() => setIsSortByModalOpen(true)}
        >
          <BiSort />
        </button>
      </div>
    </header>
  )
}

export default Header
