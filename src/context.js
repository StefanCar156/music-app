import React, { useState, useContext, useEffect } from "react"
import musicData from "./data"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // Get Favorite Songs from local storage
  const getFavoritesFromLocalStorage = () => {
    let favoriteSongs = localStorage.getItem("favoriteSongs")
    if (favoriteSongs) {
      return JSON.parse(localStorage.getItem("favoriteSongs"))
    } else {
      return []
    }
  }

  // Get Playlists from local storage
  const getPlaylistsFromLocalStorage = () => {
    let musicPlaylists = localStorage.getItem("musicPlaylists")
    if (musicPlaylists) {
      return JSON.parse(localStorage.getItem("musicPlaylists"))
    } else {
      return []
    }
  }

  // Get Recent Searches from local storage
  const getRecentSearchesFromLocalStorage = () => {
    let recentSearches = localStorage.getItem("musicRecentSearches")
    if (recentSearches) {
      return JSON.parse(localStorage.getItem("musicRecentSearches"))
    } else {
      return []
    }
  }

  const [songs, setSongs] = useState(musicData)
  const [favoriteSongs, setFavoriteSongs] = useState(
    getFavoritesFromLocalStorage()
  )
  const [playlists, setPlaylists] = useState(getPlaylistsFromLocalStorage())
  const [recentSearches, setRecentSearches] = useState(
    getRecentSearchesFromLocalStorage()
  )
  const [activeScreen, setActiveScreen] = useState("")
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)
  const [optionsID, setOptionsID] = useState()
  const [addOrRemoveOption, setAddOrRemoveOption] = useState("")
  const [isSongPlaying, setIsSongPlaying] = useState(false)
  const [volume, setVolume] = useState(100)
  const [currentSongID, setCurrentSongID] = useState(1)
  const [currentSongObject, setCurrentSongObject] = useState({})
  const [currentTime, setCurrentTime] = useState(0)
  const [currentSongDuration, setCurrentSongDuration] = useState(0)
  const [currentTimePercentage, setCurrentTimePercentage] = useState(0)
  const [displayCurrentTime, setDisplayCurrentTime] = useState("0:00")
  const [displaySongDuration, setDisplaySongDuration] = useState("0:00")
  const [newCurrentTime, setNewCurrentTime] = useState(null)
  const [currentAudioSrc, setCurrentAudioSrc] = useState(
    "./audio/dont-hold-me-down.mp3"
  )
  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [songsInOrder, setSongsInOrder] = useState(songs)
  const [shuffledSongs, setShuffledSongs] = useState([])
  const [finalSongsOrder, setFinalSongsOrder] = useState([])
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("Playlist #1")
  const [isNewPlaylistModalOpen, setIsNewPlaylistModalOpen] = useState(false)
  const [isEditingPlaylistTitle, setIsEditingPlaylistTitle] = useState(false)
  const [editingPlaylistID, setEditingPlaylistID] = useState(null)
  const [isOverlayActive, setIsOverlayActive] = useState(false)
  const [canConfirmPlaylistTitle, setCanConfirmPlaylistTitle] = useState(true)
  const [isChoosePlaylistModalOpen, setIsChoosePlaylistModalOpen] =
    useState(false)
  const [currentPlaylistID, setCurrentPlaylistID] = useState(null)
  const [currentPlaylistSongs, setCurrentPlaylistSongs] = useState()
  const [isSortByModalOpen, setIsSortByModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState("sort-d-a")
  const [activeSortBy, setActiveSortBy] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [isSearchInputActive, setIsSearchInputActive] = useState(false)
  const [searchedSongs, setSearchedSongs] = useState([])
  const [recentSearchItem, setRecentSearchItem] = useState("")

  // Add/Remove Song to/from Favorites
  const handleAddSongToFavorites = () => {
    // If ID already exists, Remove it from favorites
    for (let i = 0; i < favoriteSongs.length; i++) {
      if (favoriteSongs[i] === optionsID) {
        let filteredFavoriteSongs = favoriteSongs.filter(
          (songId) => songId !== optionsID
        )
        setFavoriteSongs(filteredFavoriteSongs)
        localStorage.setItem(
          "favoriteSongs",
          JSON.stringify(filteredFavoriteSongs)
        )
        setIsOptionsModalOpen(false)
        setOptionsID(null)
        return
      }
    }

    // If ID does not exist, Add it to favorites
    setFavoriteSongs([...favoriteSongs, optionsID])
    localStorage.setItem(
      "favoriteSongs",
      JSON.stringify([...favoriteSongs, optionsID])
    )
    setIsOptionsModalOpen(false)
    setOptionsID(null)
  }

  // Options Modal
  const handleOpenModal = (e, id) => {
    // If modal for that item is already open, close it
    if (id === optionsID) {
      setIsOptionsModalOpen(false)
      setOptionsID(null)
      return
    } else {
      // Open new modal
      setOptionsID(id)
      setIsOptionsModalOpen(true)
    }
  }

  // Display "Add" message if a song is not in favorites,
  // And "Remove" message if a song is already in favorites
  useEffect(() => {
    setAddOrRemoveOption("Add to favorites")
    for (let i = 0; i < favoriteSongs.length; i++) {
      if (favoriteSongs[i] === optionsID) {
        setAddOrRemoveOption("Remove from favorites")
      }
    }
  }, [favoriteSongs, optionsID])

  // Display Current Time
  useEffect(() => {
    let roundCurrentTime = Math.floor(currentTime)
    let currentMinutes = Math.floor(roundCurrentTime / 60)
    let currentSeconds = roundCurrentTime % 60
    let finalDisplayCurrentTime = ""

    if (roundCurrentTime >= 60 && currentSeconds < 10) {
      finalDisplayCurrentTime = `${currentMinutes}:0${currentSeconds}`
    } else if (roundCurrentTime >= 60 && currentSeconds >= 10) {
      finalDisplayCurrentTime = `${currentMinutes}:${currentSeconds}`
    } else if (roundCurrentTime < 60 && currentSeconds < 10) {
      finalDisplayCurrentTime = `0:0${currentSeconds}`
    } else {
      finalDisplayCurrentTime = `0:${currentSeconds}`
    }

    setDisplayCurrentTime(finalDisplayCurrentTime)
  }, [currentTime])

  // Display Duration
  useEffect(() => {
    let roundDuration = Math.floor(currentSongDuration)
    let durationMinutes = Math.floor(roundDuration / 60)
    let durationSeconds = roundDuration % 60
    let finalDisplayDuration = ""

    if (roundDuration >= 60 && durationSeconds < 10) {
      finalDisplayDuration = `${durationMinutes}:0${durationSeconds}`
    } else if (roundDuration >= 60 && durationSeconds >= 10) {
      finalDisplayDuration = `${durationMinutes}:${durationSeconds}`
    } else if (roundDuration < 60 && durationSeconds < 10) {
      finalDisplayDuration = `0:0${durationSeconds}`
    } else {
      finalDisplayDuration = `0:${durationSeconds}`
    }

    setDisplaySongDuration(finalDisplayDuration)
  }, [currentSongDuration])

  // Fill Progress Bar
  useEffect(() => {
    setCurrentTimePercentage((currentTime / currentSongDuration) * 100)
  }, [currentTime])

  // Change Current Time on Seeking
  const handleTimeSeek = (e) => {
    setNewCurrentTime(e.target.value)
  }

  // Choose Song
  const handleChooseSong = (e, id) => {
    // If you click on options btn/modal
    if (
      e.target.classList.contains("list-song-options-btn") ||
      e.target.classList.contains("options-modal") ||
      e.target.classList.contains("options-modal-item")
    ) {
      return
    }
    // If you choose song
    setCurrentSongID(id)
    setIsSongPlaying(true)

    // Based on where you choose song from, set songsInOrder array

    // If you choose song from All Songs
    if (
      e.target.classList.contains("list-song") &&
      !e.target.classList.contains("favorite-song") &&
      !e.target.classList.contains("playlist-song")
    ) {
      setSongsInOrder(songs)
    }

    // If you choose song from Favorite Songs
    if (e.target.classList.contains("favorite-song")) {
      let favoriteSongsData = []
      songs.map((song) => {
        favoriteSongs.map((favSongID) => {
          if (song.id === favSongID) {
            favoriteSongsData.push(song)
          }
        })
      })

      setSongsInOrder(favoriteSongsData)
    }

    // If you choose song from Playlist
    if (e.target.classList.contains("playlist-song")) {
      let playlistSongsData = []
      songs.map((song) => {
        currentPlaylistSongs.map((playlistSongID) => {
          if (song.id === playlistSongID) {
            playlistSongsData.push(song)
          }
        })
      })

      setSongsInOrder(playlistSongsData)
    }
    // If you choose song from Searched Songs
    if (e.target.classList.contains("searched-song")) {
      let searchedSongsData = []
      songs.map((song) => {
        searchedSongs.map((searchedSong) => {
          if (song.id === searchedSong.id) {
            searchedSongsData.push(song)
          }
        })
      })

      setSongsInOrder(searchedSongsData)
    }
  }

  // Update Songs Order when it changes
  useEffect(() => {
    setFinalSongsOrder(songsInOrder)
  }, [songsInOrder])

  // Based on current ID, get current song props
  useEffect(() => {
    setCurrentSongObject(songs.filter((song) => song.id === currentSongID)[0])
  }, [currentSongID])

  // Previous/Next Song
  const handlePrevSong = () => {
    let currentSongPositionInData
    finalSongsOrder.map((songObject) => {
      if (songObject.id === currentSongID) {
        currentSongPositionInData = finalSongsOrder.indexOf(songObject)
      }
    })
    if (currentSongPositionInData < 1) {
      setCurrentSongID(finalSongsOrder[finalSongsOrder.length - 1].id)
      return
    }
    setCurrentSongID(finalSongsOrder[currentSongPositionInData - 1].id)
  }

  const handleNextSong = () => {
    let currentSongPositionInData
    finalSongsOrder.map((songObject) => {
      if (songObject.id === currentSongID) {
        currentSongPositionInData = finalSongsOrder.indexOf(songObject)
      }
    })
    if (currentSongPositionInData >= finalSongsOrder.length - 1) {
      setCurrentSongID(finalSongsOrder[0].id)
      return
    }
    setCurrentSongID(finalSongsOrder[currentSongPositionInData + 1].id)
  }

  // Shuffle Play
  // If shuffle is off, use songsInOrder
  // If shuffle is on, use shuffledSongs
  useEffect(() => {
    if (isShuffleOn) {
      let shuffledArray = songsInOrder
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
      setShuffledSongs(shuffledArray)
      setFinalSongsOrder(shuffledArray)
    } else {
      setFinalSongsOrder(songsInOrder)
    }
  }, [isShuffleOn])

  // Playlists

  // Set Default Playlist Title when Modal Opens
  useEffect(() => {
    if (isEditingPlaylistTitle) {
      return
    }
    setIsEditingPlaylistTitle(false)
    if (playlists.length > 0) {
      let serialNum = 1
      for (let i = 0; i <= playlists.length - 1; i++) {
        let existingNum = parseInt(
          playlists
            .sort((a, b) => (a.title > b.title ? 1 : -1))
            [i].title.replace("Playlist #", "")
        )
        if (serialNum === existingNum) {
          serialNum++
        }
      }
      setNewPlaylistTitle(`Playlist #${serialNum}`)
    } else {
      setNewPlaylistTitle(`Playlist #1`)
    }
  }, [isNewPlaylistModalOpen])

  // Check if playlist title would be unique
  useEffect(() => {
    setCanConfirmPlaylistTitle(true)
    playlists.map((playlist) => {
      if (playlist.title === newPlaylistTitle) {
        setCanConfirmPlaylistTitle(false)
      }
    })
  }, [newPlaylistTitle])

  // Create New Playlist
  const handleCreateNewPlaylist = () => {
    // Check if user is Editing existing Playlist
    if (isEditingPlaylistTitle) {
      let updatedPlaylistTitle
      let playlistInEdit = playlists.filter(
        (playlist) => playlist.id === editingPlaylistID
      )[0]
      let filteredPlaylists = playlists.filter(
        (playlist) => playlist.id !== editingPlaylistID
      )

      let updatedPlaylist = {
        ...playlistInEdit,
        title: updatedPlaylistTitle,
      }

      setPlaylists([...filteredPlaylists, updatedPlaylist])
      localStorage.setItem(
        "musicPlaylists",
        JSON.stringify([...filteredPlaylists, updatedPlaylist])
      )
      setIsEditingPlaylistTitle(false)
      setIsNewPlaylistModalOpen(false)
      return
    }

    let newPlaylistObject
    let playlistID = 1
    let playlistTitle = newPlaylistTitle

    // Check if title already exists
    playlists.map((playlist) => {
      if (playlist.title === newPlaylistTitle) {
        playlistTitle = `${newPlaylistTitle}(1)`
      }
    })

    // Find Unique ID
    playlists
      .sort((a, b) => (a.id > b.id ? 1 : -1))
      .map((playlist) => {
        if (playlist.id === playlistID) {
          playlistID = playlistID + 1
        }
      })

    newPlaylistObject = {
      id: playlistID,
      title: playlistTitle,
      songs: [],
    }

    setPlaylists([...playlists, newPlaylistObject])
    localStorage.setItem(
      "musicPlaylists",
      JSON.stringify([...playlists, newPlaylistObject])
    )
    setIsNewPlaylistModalOpen(false)
  }

  // Remove Playlist
  const handleRemovePlaylist = (id) => {
    let filteredPlaylists = playlists.filter((playlist) => playlist.id !== id)

    setPlaylists(filteredPlaylists)
    localStorage.setItem(
      "musicPlaylists",
      JSON.stringify([...filteredPlaylists])
    )
  }

  // Change Playlist Title
  const handleChangePlaylistTitle = (id, title) => {
    setIsEditingPlaylistTitle(true)
    setEditingPlaylistID(id)
    setNewPlaylistTitle(title)
    setIsNewPlaylistModalOpen(true)
  }

  useEffect(() => {
    if (!isNewPlaylistModalOpen) {
      setIsEditingPlaylistTitle(false)
    }
  }, [isNewPlaylistModalOpen])

  // Activate Overlay when Modal is Open
  useEffect(() => {
    isNewPlaylistModalOpen || isChoosePlaylistModalOpen || isSortByModalOpen
      ? setIsOverlayActive(true)
      : setIsOverlayActive(false)
  }, [isNewPlaylistModalOpen, isChoosePlaylistModalOpen, isSortByModalOpen])

  // Open Playlist Chocies Modal
  const handleOpenPlaylistChoicesModal = () => {
    setIsOptionsModalOpen(false)
    setIsChoosePlaylistModalOpen(true)
  }

  // Close Playlist Choices Modal
  const handleClosePlaylistChoicesModal = () => {
    setIsChoosePlaylistModalOpen(false)
    setOptionsID(null)
  }

  // Add Song to Playlist
  const handleAddSongToPlaylist = (id) => {
    let selectedPlaylist = playlists.filter((playlist) => playlist.id === id)[0]
    let filteredPlaylists = playlists.filter((playlist) => playlist.id !== id)

    let updatedPlaylist = {
      ...selectedPlaylist,
      songs: [...new Set([...selectedPlaylist.songs, optionsID])], // Prevent duplicating songs
    }

    setPlaylists([...filteredPlaylists, updatedPlaylist])
    localStorage.setItem(
      "musicPlaylists",
      JSON.stringify([...filteredPlaylists, updatedPlaylist])
    )

    setIsChoosePlaylistModalOpen(false)
    setOptionsID(null)
    setIsOptionsModalOpen(false)
  }

  // Remove Song from Playlist
  const handleRemoveSongFromPlaylist = () => {
    let filteredPlaylistSongs
    let filteredPlaylists
    let filteredPlaylist

    playlists.map((playlist) => {
      if (playlist.id === currentPlaylistID) {
        filteredPlaylistSongs = playlist.songs.filter(
          (songID) => songID !== optionsID
        )
        filteredPlaylist = {
          ...playlist,
          songs: filteredPlaylistSongs,
        }
        filteredPlaylists = playlists.filter(
          (playlist) => playlist.id !== currentPlaylistID
        )
      }
    })

    setPlaylists([...filteredPlaylists, filteredPlaylist])
    localStorage.setItem(
      "musicPlaylists",
      JSON.stringify([...filteredPlaylists, filteredPlaylist])
    )
    setIsOptionsModalOpen(false)
  }

  // Set Current Playlist
  const handleCurrentPlaylist = (id, title, songs) => {
    setCurrentPlaylistID(id)
    setActiveScreen(title)
    setCurrentPlaylistSongs(songs)
  }

  // Sorting
  const handleSortBy = (e) => {
    setSortBy(e.target.id)
    setIsSortByModalOpen(false)
  }

  useEffect(() => {
    setActiveSortBy(sortBy)
    switch (sortBy) {
      case "sort-n-a":
        setSongs(musicData.sort((a, b) => (a.name > b.name ? 1 : -1)))
        break
      case "sort-n-d":
        setSongs(musicData.sort((a, b) => (a.name < b.name ? 1 : -1)))
        break
      case "sort-d-a":
        setSongs(musicData.sort((a, b) => (a.id > b.id ? 1 : -1)))
        break
      case "sort-d-d":
        setSongs(musicData.sort((a, b) => (a.id < b.id ? 1 : -1)))
        break
      default:
        setSongs(musicData.sort((a, b) => (a.id > b.id ? 1 : -1)))
        break
    }
  }, [sortBy])

  // Search
  const handleSearch = (e) => {
    if (searchValue.length === 0) {
      setIsSearchInputActive(false)
      setFinalSongsOrder(songsInOrder)
      e.target.blur()
    } else {
      handleConfirmSearch(e)
    }
  }

  // Confirm Search Filter
  const handleConfirmSearch = (e) => {
    let providedValue = searchValue
    if (recentSearchItem !== "") {
      providedValue = recentSearchItem
    }
    if (providedValue === "") {
      return
    }
    // Add New Value to Recent Searches
    setRecentSearches([...new Set([providedValue, ...recentSearches])])
    localStorage.setItem(
      "musicRecentSearches",
      JSON.stringify([...new Set([providedValue, ...recentSearches])])
    )

    // Filter Array, return only matched songs
    let filteredArray = []
    let lowerCaseValue = providedValue.toLowerCase()
    songsInOrder.map((song) => {
      if (
        song.name.toLowerCase().includes(lowerCaseValue) ||
        song.artist.toLowerCase().includes(lowerCaseValue)
      ) {
        filteredArray.push(song)
      }
    })
    setIsSearchInputActive(false)
    setRecentSearchItem("")
    setSearchedSongs(filteredArray)
    setSearchValue(providedValue)
    if (e) {
      if (e.target.classList.contains("search-input")) {
        e.target.blur()
      }
    }
  }

  // Choose Search Value from Recent Searches
  const handleUseRecentSearch = (e, item) => {
    if (!e.target.classList.contains("remove-recent-search-btn")) {
      setRecentSearchItem(item)
      setIsSearchInputActive(false)
    }
  }

  useEffect(() => {
    setSearchValue(recentSearchItem)
    handleConfirmSearch()
  }, [recentSearchItem])

  // Remove Recent Search
  const handleRemoveRecentSearch = (e) => {
    let targetedItem = e.target.previousSibling.textContent
    let filteredArray = recentSearches.filter(
      (search) => search !== targetedItem
    )

    setRecentSearches(filteredArray)
    localStorage.setItem("musicRecentSearches", JSON.stringify(filteredArray))
  }

  // Close Modals on Click Outside
  const handleClick = (e) => {
    if (
      !e.target.classList.contains("search-input") &&
      !e.target.classList.contains("list-song-options-btn") &&
      !e.target.classList.contains("remove-recent-search-btn") &&
      !e.target.classList.contains("all-songs-sort-btn")
    ) {
      setIsOptionsModalOpen(false)
      setIsSearchInputActive(false)
      setIsSortByModalOpen(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        songs,
        setSongs,
        isSongPlaying,
        setIsSongPlaying,
        handleAddSongToFavorites,
        favoriteSongs,
        activeScreen,
        setActiveScreen,
        handleOpenModal,
        isOptionsModalOpen,
        setIsOptionsModalOpen,
        addOrRemoveOption,
        optionsID,
        setOptionsID,
        volume,
        setVolume,
        currentTimePercentage,
        setCurrentTimePercentage,
        currentTime,
        setCurrentTime,
        displayCurrentTime,
        newCurrentTime,
        setNewCurrentTime,
        handleTimeSeek,
        currentSongDuration,
        setCurrentSongDuration,
        displaySongDuration,
        handleChooseSong,
        currentSongID,
        setCurrentSongID,
        currentSongObject,
        currentAudioSrc,
        setCurrentAudioSrc,
        handlePrevSong,
        handleNextSong,
        isShuffleOn,
        setIsShuffleOn,
        playlists,
        newPlaylistTitle,
        setNewPlaylistTitle,
        isNewPlaylistModalOpen,
        setIsNewPlaylistModalOpen,
        handleCreateNewPlaylist,
        handleRemovePlaylist,
        handleChangePlaylistTitle,
        isOverlayActive,
        canConfirmPlaylistTitle,
        handleOpenPlaylistChoicesModal,
        handleAddSongToPlaylist,
        isChoosePlaylistModalOpen,
        setIsChoosePlaylistModalOpen,
        handleClosePlaylistChoicesModal,
        handleCurrentPlaylist,
        currentPlaylistID,
        currentPlaylistSongs,
        setCurrentPlaylistSongs,
        shuffledSongs,
        finalSongsOrder,
        handleRemoveSongFromPlaylist,
        handleSortBy,
        isSortByModalOpen,
        setIsSortByModalOpen,
        sortBy,
        activeSortBy,
        searchValue,
        setSearchValue,
        isSearchInputActive,
        setIsSearchInputActive,
        recentSearches,
        handleSearch,
        handleRemoveRecentSearch,
        searchedSongs,
        setSearchedSongs,
        handleUseRecentSearch,
        handleClick,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
