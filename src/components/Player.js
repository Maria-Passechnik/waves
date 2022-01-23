import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons"

const Player = ({ isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setSongs, currentSong, setCurrentSong}) => {    
    // Handlers
    // Active library
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active:true,
                }
            } else {
                return{
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
        console.log('active library is running!')
    };
    // play song
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    // set time frame - doration & current
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    // set input range handler
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    };
    // skip track - back & forward
    const skipTrackHandler = async (direction) => {
        let currIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currIndex +1) % songs.length]);
            activeLibraryHandler(songs[(currIndex +1) % songs.length]);
        }
        if(direction === 'skip-back'){
            if((currIndex -1) % songs.length === -1){
                await setCurrentSong(songs[songs.length -1]);
                activeLibraryHandler(songs[songs.length -1]);
                // check if the song is playing
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currIndex -1) % songs.length]);
            activeLibraryHandler(songs[(currIndex -1) % songs.length]);

        }
        // check if the song is playing
        if(isPlaying) audioRef.current.play();
    };

    return(
        <div className="player-container">
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')}
                    className="skip-back" 
                    size="2x" 
                    icon={faAngleLeft} 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay } 
                />
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-forward')}
                    className="skip-forward" 
                    size="2x" 
                    icon={faAngleRight} 
                />
            </div>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    onChange={dragHandler}
                    value={songInfo.currentTime}
                    min={0} 
                    max={songInfo.duration || 0} 
                    className="form-range" 
                    type="range"
                />
                <p>{ songInfo.duration ? getTime(songInfo.duration) : "0:00" }</p>
            </div>
        </div>
    );
     
}

export default Player;