import React from 'react';
import LibrarySong from "./LibrarySong";

const Library = ({songs, setSongs, setCurrentSong, audioRef, isPlaying, libraryStatus }) => {

    return (
        <div className={`library ${libraryStatus ? 'active' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(item => <LibrarySong setCurrentSong={setCurrentSong}
                                                    songs={songs}
                                                    setSongs={setSongs}
                                                    song={item}
                                                    key={item.id}
                                                    audioRef={audioRef} isPlaying={isPlaying}/>)}
            </div>
        </div>
    );
};

export default Library;