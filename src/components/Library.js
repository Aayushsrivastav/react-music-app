import React from 'react';
import LibrarySong from "./LibrarySong";

const Library = ({songs, isPlaying, audioRef, libraryStatus, setCurrentSong, setSongs}) => {
    return(
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                <LibrarySong song={song} songs={songs} key={song.id} isPlaying={isPlaying} setCurrentSong={setCurrentSong} setSongs={setSongs} audioRef={audioRef}/>
                ))};
            </div>
        </div>
    );
};

export default Library;