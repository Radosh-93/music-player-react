export const playAudio = (isPlaying, audioRef) => {
    if(isPlaying) {
        const promisePlay = audioRef.current.play();
        if(promisePlay !== undefined) {
            promisePlay.then(audio => audioRef.current.play())
        }
    }
};