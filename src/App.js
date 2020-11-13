import React, {useRef, useState} from "react";
import './styles/App.scss'
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import data from './data'
import Nav from "./components/Nav";


function App() {
    //Ref
    const audioRef = useRef(null);
    //State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo]= useState({
        currentTime: 0,
        duration: 0,
        animation: 0
    });
    const [libraryStatus, setLibraryStatus] = useState(false)

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrentTime = Math.round(currentTime);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrentTime / roundedDuration) * 100);

        setSongInfo({...songInfo, currentTime, duration, animation})
    }
    return (
        <div className="App">
            <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
            <Song currentSong={currentSong}/>
            <Player isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                    songInfo={songInfo}
                    setSongInfo={setSongInfo}
                    songs={songs}
                    setSongs={setSongs}
                    audioRef={audioRef}/>
            <Library songs={songs}
                     setSongs={setSongs}
                     setCurrentSong={setCurrentSong}
                     audioRef={audioRef}
                     isPlaying={isPlaying}
                     libraryStatus={libraryStatus}/>
            <audio onTimeUpdate={timeUpdateHandler}
                   onLoadedMetadata={timeUpdateHandler}
                   ref={audioRef} src={currentSong.audio}/>
        </div>
    );
}

export default App;
