import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Player = ({audioRef, currentSong, isPlaying, songInfo, songs, setCurrentSong, setIsPlaying, setSongInfo, setSongs}) => {
    const activeLibraryHandler = (nextPrev) => {
        //Handle song active state
        const newSongs = songs.map((song_data) => {
            if(song_data.id === nextPrev.id){
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
    };
    //Handle play and pause button
    const playSongHandler = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    };
    //Update song timeStamp based on range input
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({
            ...songInfo,
            currentTime: e.target.value
        });
    };
    //Handle track skip function
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "next"){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction === "previous"){
            if((currentIndex - 1) === -1){
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[currentIndex - 1]);
            activeLibraryHandler(songs[currentIndex - 1]);
        }
        if(isPlaying) audioRef.current.play();
    };
    //Return formated time 
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0"+ Math.floor(time % 60)).slice(-2)
        );
    };
    //Animation handler
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}}>
                    <input type="range" value={songInfo.currentTime} min={0} max={songInfo.duration || 0} onChange={dragHandler}/>
                    <div className="animate-track" style={trackAnim}></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("previous")} className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler("next")} className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>
        </div>
    );
};

export default Player;
