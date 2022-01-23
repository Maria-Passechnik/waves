import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setSongs, setCurrentSong, audioRef, isPlaying, libraryStatus}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong
                        isPlaying={isPlaying}
                        song={song}
                        setCurrentSong={setCurrentSong}
                        songs={songs}
                        setSongs={setSongs}  
                        key={song.id}
                        id={song.id}
                        audioRef={audioRef}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
