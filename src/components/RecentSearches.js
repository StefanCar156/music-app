import React from "react"
import { IoClose } from "react-icons/io5"
import { useGlobalContext } from "../context"
import { Link } from "react-router-dom"

const RecentSearches = () => {
  const { recentSearches, handleRemoveRecentSearch, handleUseRecentSearch } =
    useGlobalContext()
  const linkStyle = {
    textDecoration: "none",
    color: "rgba(249, 248, 255, 0.5)",
  }

  return (
    <div className="recent-searches-container">
      <h1 className="recent-searches-title">Recent search</h1>
      <ul className="recent-searches-list">
        {recentSearches.length === 0 ? (
          <p className="no-songs-message">No recent searches</p>
        ) : null}
        {recentSearches.map((item, i) => {
          // Don't Display More than 8 Recent Searches
          if (i > 8) {
            return
          }
          return (
            <li
              className="recent-searches-item"
              onClick={(e) => handleUseRecentSearch(e, item)}
              key={i}
            >
              <Link to="/search" style={linkStyle}>
                {item}
              </Link>
              <button
                className="remove-recent-search-btn"
                onClick={(e) => handleRemoveRecentSearch(e)}
              >
                <IoClose />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RecentSearches
