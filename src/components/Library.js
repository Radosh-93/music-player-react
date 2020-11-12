import React from 'react';
import LibrarySong from "./LibrarySong";

const Library = ({songsInfo, setCurrentSong, audioRef, isPlaying, setSongs,libraryStatus }) => {

    return (
        <div className={`library ${libraryStatus ? 'active' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songsInfo.map(item => <LibrarySong setCurrentSong={setCurrentSong}
                                                    songs={songsInfo}
                                                    setSongs={setSongs}
                                                    song={item}
                                                    key={item.id}
                                                    audioRef={audioRef} isPlaying={isPlaying}/>)}
            </div>
        </div>
    );
};

export default Library;