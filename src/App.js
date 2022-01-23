import React, {useState, useRef} from "react";
// import components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
// import styles
import "./styles/app.scss";
// import songs data
import data from "./Data";

function App() {
  
  // state
  const [ songInfo, setSongInfo ] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [ songs, setSongs ] = useState(data());
  const [ currentSong, setCurrentSong ] = useState(songs[0]);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ libraryStatus, setLibraryStatus ] = useState(false);

  // ref
  const audioRef = useRef(null);

  // Event handlers
  const timeUpdtaeHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo, currentTime: current, duration});
  };
  // End of the Song 
  const songEndHandler = async () => {
    let currIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currIndex +1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  };
  
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav 
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong}/>
      <Player 
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library 
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
      />
      <audio 
        onEnded={songEndHandler}
        onLoadedMetadata={timeUpdtaeHandler}
        onTimeUpdate={timeUpdtaeHandler} 
        ref={audioRef} 
        src={currentSong.audio}>
      </audio>
    </div>
  );
}

export default App;
