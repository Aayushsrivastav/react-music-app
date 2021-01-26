import React, { useRef, useState } from 'react';

import "./styles/app.scss";
import Nav from "./components/Nav";
import Song from './components/Song';
import Player from "./components/Player";
import Library from "./components/Library";

import data from './data';

function App() {
  //Reference html audio tag
  const audioRef = useRef(null);
  //State storage
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  //Handle Songs time indicator
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate progress percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
        ...songInfo,
        currentTime: current,
        duration,
        animationPercentage
    });
};

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player 
      audioRef={audioRef} 
      songInfo={songInfo} 
      setSongInfo={setSongInfo} 
      songs={songs}
      setSongs={setSongs}
      isPlaying={isPlaying} 
      setIsPlaying={setIsPlaying} 
      currentSong={currentSong}
      setCurrentSong={setCurrentSong}/>
      <Library 
      audioRef={audioRef} 
      currentSong={currentSong} 
      songs={songs} 
      setSongs={setSongs} 
      setCurrentSong={setCurrentSong} 
      isPlaying={isPlaying}
      libraryStatus={libraryStatus} />
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
