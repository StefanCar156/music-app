import React from "react"
import { MdLibraryMusic, MdQueueMusic } from "react-icons/md"
import { AiFillHeart } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context"

const Navigation = () => {
  const { activeScreen } = useGlobalContext()
  return (
    <nav className="nav">
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/">
            <button
              className={`nav-btn ${
                activeScreen === "All songs" && `nav-btn-active`
              }`}
            >
              <MdQueueMusic />
            </button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/favorites">
            <button
              className={`nav-btn ${
                activeScreen === "Favorite songs" && `nav-btn-active`
              }`}
            >
              <AiFillHeart />
            </button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/playlists">
            <button
              className={`nav-btn ${
                activeScreen === "Playlists" && `nav-btn-active`
              }`}
            >
              <MdLibraryMusic />
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
