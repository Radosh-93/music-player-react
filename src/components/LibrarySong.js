import React from 'react';

const LibrarySong = ({song, songs, setSongs, setCurrentSong, audioRef, isPlaying}) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        //check if song is playing
        if(isPlaying) {
            const promisePlay = audioRef.current.play();
            if(promisePlay !== undefined) {
                promisePlay.then(audio => audioRef.current.play())
            }
        }
        //Adding active class
        const newActiveSongs = songs.map(item => {
            if(item.id === song.id) {
                return {...item, active: true}
            } else {
                return {...item, active: false}
            }
        });
        setSongs(newActiveSongs);

    }
    return (
        <div className={`library-song ${song.active ? 'selected' : ''}`} onClick={songSelectHandler}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;