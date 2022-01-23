import React from "react";

const LibrarySong = ({ song, songs, setSongs, setCurrentSong, audioRef, isPlaying,id}) => {

    // Handlers
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        // add active state
        const newSongs = songs.map((song) => {
            if(song.id === id){
                return{
                    ...song,
                    active:true,
                }
            } else {
                return{
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
        console.log('song Selector is running!!');
        // check if the song is playing
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
}

export default LibrarySong;