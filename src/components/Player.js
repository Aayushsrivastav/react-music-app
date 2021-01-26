import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Player = ({audioRef, currentSong, isPlaying, songInfo, setIsPlaying, setSongInfo}) => {
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
    //Return formated time 
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0"+ Math.floor(time % 60)).slice(-2)
        );
    };

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input type="range" value={songInfo.currentTime} min={0} max={songInfo.duration || 0} onChange={dragHandler}/>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon className="skip-forrward" size="2x" icon={faAngleRight}/>
            </div>
        </div>
    );
};

export default Player;
