import React from 'react';
import { playAudio } from "../util";

const LibrarySong = ({song, songs, isPlaying, setCurrentSong, setSongs, audioRef}) => {

    const songSelectHandler = () => {
        //Song selection
        setCurrentSong(song);
        //Handle song active state
        const newSongs = songs.map((song_data) => {
            if(song_data.id === song.id){
                return {
                    ...song_data,
                    active: true
                }
            }else{
                return{
                    ...song_data,
                    active: false
                }
            }
        });
        setSongs(newSongs);
        playAudio(isPlaying, audioRef);
    };

    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
