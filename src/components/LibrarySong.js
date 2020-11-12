import React from 'react';
import {playAudio} from "../util";

const LibrarySong = ({song, songs, setSongs, setCurrentSong, audioRef, isPlaying}) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        //check if song is playing
        playAudio(isPlaying, audioRef);
        //Adding active class
        const newSongs = songs.map(item => {
            if(item.id === song.id) {
                return {...item, active: true}
            } else {
                return {...item, active: false}
            }
        });
        setSongs(newSongs);

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