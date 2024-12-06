import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) =>{

    const audioRef=useRef()
    const seekBg=useRef()
    const seekBar = useRef()

    const [track,setTrack]=useState(songsData[0])
    const [playStatus,setPlayStatus]=useState(false);
    const [time,setTime]=useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })

    const play = () =>{
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = ()=>{
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const playWithId = async (id) =>{
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true)
    }

    const previous = async () =>{
        if (track.id>0) {
            await setTrack(songsData[track.id-1])
            await audioRef.current.play();
            setPlayStatus(true)
        }
    }
    const next = async () => {
        if (track.id < songsData.length - 1) {
            const nextTrack = songsData[track.id + 1]; 
            await setTrack(nextTrack); 
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.load(); 
                    audioRef.current.play(); 
                }
            }, 0); 
            setPlayStatus(true);
        }
    };

    const seekSong = async (e) =>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    useEffect(() => {
        const updateSeekBar = () => {
            if (audioRef.current && seekBar.current) {
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;
    
                if (duration > 0) {
                    const progress = (currentTime / duration) * 100;
                    seekBar.current.style.width = `${progress}%`;
    
                    setTime({
                        currentTime: {
                            second: Math.floor(currentTime % 60),
                            minute: Math.floor(currentTime / 60),
                        },
                        totalTime: {
                            second: Math.floor(duration % 60),
                            minute: Math.floor(duration / 60),
                        },
                    });
                }
            }
        };
    
        const handleSongEnd = () => {
            next(); 
        };
    
        if (audioRef.current) {
            audioRef.current.ontimeupdate = updateSeekBar;
            audioRef.current.onended = handleSongEnd;
        }
    
        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
                audioRef.current.onended = null;
            }
        };
    }, [audioRef, next]);
    

    
    

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,next,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider