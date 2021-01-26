import React from 'react';

const LibrarySong = ({song, songs, isPlaying, setCurrentSong, setSongs, audioRef}) => {

    const songSelectHandler = async () => {
        //Song selection
        await setCurrentSong(song);
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
        if(isPlaying) audioRef.current.play();
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
