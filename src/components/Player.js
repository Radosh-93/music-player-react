import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({
                    isPlaying,
                    setIsPlaying,
                    songInfo,
                    setSongInfo,
                    audioRef,
                    currentSong,
                    setCurrentSong,
                    songs,
                    setSongs
                }) => {
    const activeLibraryHandler = (prevNext) => {
        const newSongs = songs.map(item => {
            if (item.id === prevNext.id) {
                return {...item, active: true}
            } else {
                return {...item, active: false}
            }
        });
        setSongs(newSongs);
    };
    //Event Handler
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }
    const skipTrackHandler = async (direction) => {
        const currentIndex = songs.findIndex(item => item.id === currentSong.id);
        if (direction === 'skip-forward') {
            const nextSong = songs[(currentIndex + 1) % songs.length];
            await setCurrentSong(nextSong);
            activeLibraryHandler(nextSong);
        } else if (direction === 'skip-back') {
            const prevSong = songs[(currentIndex - 1) === -1 ? (songs.length - 1) : (currentIndex - 1)];
            await setCurrentSong(prevSong);
            activeLibraryHandler(prevSong);
        }
        if (isPlaying) audioRef.current.play();
    }
    //Add the styles
    const trackAnimationStyles = {
        transform: `translateX(${songInfo.animation}%)`
    }
    const trackStyles = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
    }
    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={trackStyles}>
                    <input min={0}
                           max={songInfo.duration || 0}
                           value={songInfo.currentTime}
                           onChange={dragHandler}
                           type="range"/>
                    <div style={trackAnimationStyles} className="animate-track"/>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className='skip-back'
                                 size='2x' icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler}
                                 className='play'
                                 size='2x' icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')}
                                 className='skip-forward'
                                 size='2x' icon={faAngleRight}/>
            </div>

        </div>
    );
};

export default Player;