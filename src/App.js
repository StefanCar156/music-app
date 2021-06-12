import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AllSongs from "./components/AllSongs"
import MiniPlayer from "./components/MiniPlayer"
import Navigation from "./components/Navigation"
import FavoriteSongs from "./components/FavoriteSongs"
import PlaylistsContainer from "./components/PlaylistsContainer"
import SongContainer from "./components/SongContainer"
import AudioSource from "./components/AudioSource"
import CreatePlaylistModal from "./components/CreatePlaylistModal"
import { useGlobalContext } from "./context"
import Overlay from "./components/Overlay"
import ChoosePlaylistModal from "./components/ChoosePlaylistModal"
import Playlist from "./components/Playlist"
import SortByModal from "./components/SortByModal"
import RecentSearches from "./components/RecentSearches"
import SearchedSongs from "./components/SearchedSongs"

function App() {
  const {
    isNewPlaylistModalOpen,
    isChoosePlaylistModalOpen,
    isSortByModalOpen,
    isOverlayActive,
    isSearchInputActive,
    handleClick,
  } = useGlobalContext()
  return (
    <Router>
      <div className="App" onClick={(e) => handleClick(e)}>
        <Switch>
          <Route path="/" exact component={AllSongs} />
          <Route path="/favorites" exact component={FavoriteSongs} />
          <Route path="/playlists" exact component={PlaylistsContainer} />
          <Route path="/playlist" exact component={Playlist} />
          <Route path="/song" exact component={SongContainer} />
          <Route path="/search" exact component={SearchedSongs} />
        </Switch>
        {isNewPlaylistModalOpen ? <CreatePlaylistModal /> : null}
        {isChoosePlaylistModalOpen ? <ChoosePlaylistModal /> : null}
        {isSortByModalOpen ? <SortByModal /> : null}
        {isSearchInputActive ? <RecentSearches /> : null}
        {isOverlayActive ? <Overlay /> : null}
        <Route
          path={["/", "/favorites", "playlists", "/playlist", "/search"]}
          exact
          component={MiniPlayer}
        />
        <Navigation />
        <AudioSource />
      </div>
    </Router>
  )
}

export default App
