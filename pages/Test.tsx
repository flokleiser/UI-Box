// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// export default function Test() {

//     return (
//         <div className="bodyCenter">
//             <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
//                 <h1>Test</h1>
//             </div>

//             <div className="music-progress">
//                 <div className="progress-bar">
//                     <span className="progress-line"></span>
//                     <input type='range' min='0' max='100' value='0' className="progress" id="progress"/>
//                 </div>
//                 <div className="duration">
//                     <span className="current-time">00:00</span>
//                     <span className="duration-time">00:00</span>
//                 </div>
//             </div>

//         </div>
//     );
// }

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "../components/Slider";
import { music} from "../components/Music";
import Overlay from "../components/Overlay";
import AudioMotionAnalyzer from 'audiomotion-analyzer';

export default function Musializer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(50);
    const [bass, setBass] = useState(false);
    const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [currentSong, setCurrentSong] = useState(music[2]);

    const radius = 85;
    const circumference = 2 * Math.PI * radius/2;
    const initialOffset = circumference;
    const [offset, setOffset] = useState(initialOffset);
    const [progress, setProgress] = useState(0);

    let smoothedIntensity = 0;


    const buttonRef = useRef<HTMLButtonElement>(null)
    const buttonRefSmall1 = useRef<HTMLButtonElement>(null)
    const buttonRefSmall2 = useRef<HTMLButtonElement>(null)
    const buttonRefSmall3 = useRef<HTMLButtonElement>(null)
    const buttonRefSmall4 = useRef<HTMLButtonElement>(null)
    const outlineRef = useRef<SVGCircleElement>(null)
    const volumeRef = useRef<HTMLSpanElement>(null)
    const intensityRef = useRef<HTMLSpanElement>(null)

    const [bounceRadiusIntensity, setBounceRadiusIntensity] = useState(5);

    const normalizeBounceRadiusIntensity = (value:number) => {
        return (value / 10) * 2; // Normalize from 0-9 to 0-2
    };

    // if (isEqualizer) {
        useEffect(() => {
                console.log('init old')
            const updateAudioData = () => {
              if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);
                const bassRange = dataArray.slice(0, 2);
                const intensity = bassRange.reduce((sum, value) => sum + value, 0);
              }
              requestAnimationFrame(updateAudioData);
            };
            updateAudioData();
          }, []);
        // }

    //gui/equalizer
    const handleMusicLibraryClick = () => {
        setOverlayVisible(true)
    }
    const handleCloseOverlay = () => {
        setOverlayVisible(false)
    }
    const handleSongSelect = (song: typeof music[0]) => {
        setCurrentSong(song);
        setOverlayVisible(false);
    };

    //song selection
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
        }
    }, [currentSong]);

    //audio duration and time
    useEffect(() => {
        let audio = audioRef.current;
        if (!audio) return;

        const setAudioDuration = () => {
            setDuration(audio.duration);
        };
        const setAudioTime = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        audio.addEventListener("durationchange", setAudioDuration);
        audio.addEventListener("timeupdate", setAudioTime);

        return () => {
            audio.removeEventListener("durationchange", setAudioDuration);
            audio.removeEventListener("timeupdate", setAudioTime);
        };
    });

    //audio setup
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(currentSong.file);
            audioContextRef.current = new (window.AudioContext ||
                (window as any).webkitAudioContext)();
            const source = audioContextRef.current.createMediaElementSource(
                audioRef.current
            );
            analyserRef.current = audioContextRef.current.createAnalyser();
            source.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
            analyserRef.current.fftSize = 256;
            const bufferLength = analyserRef.current.frequencyBinCount;
            setAudioData(new Uint8Array(bufferLength));
        }
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [volume, isPlaying, audioRef.current]);


    //handle keys
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            event.preventDefault();
            handlePlayClick();
        }
    };
    const handlePlayClick = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    };
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = (parseFloat(e.target.value) / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };


    return (
        <div className="bodyCenter">
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <motion.h1>Musializer</motion.h1>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                <Overlay isVisible={isOverlayVisible} onClose={handleCloseOverlay}>
                    <h3>
                    <div>
                    {music.map((song, index) => (
                        <div className="overlayContent" style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}} key={index} onClick={() => handleSongSelect(song)}>
                        {song.name} - {song.artist}
                        </div>
                    ))}
                    </div>
                    </h3>
                </Overlay>
                </div>
            </div>


            {/* GUI */}
            <div
                style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center",}}>
                <div style={{position: "relative",display: "flex",flexDirection: "column",justifyContent: "center",alignItems:"center"}}>
                    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center",marginLeft:"15px", marginRight:'15px'}}>
                    {/* Playbutton */}
                    <motion.button
                        ref={buttonRef}
                        className="playButton"
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", }}
                        onMouseDown={handlePlayClick}
                        animate={{ scale: bass ? 1.5 : 1 }}
                        transition={{ type: "spring", duration: 0.2 }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: "35px" }} >
                            {isPlaying ? "play_arrow" : "pause"}
                        </span>
                    </motion.button>

                    {/* circle thingy */}
                    <motion.svg
                        style={{ position: "absolute", zIndex: -10, }}
                        width="200"
                        height="200"
                    >
                        <motion.circle
                            ref = {outlineRef}
                            className="progressCircle"
                            stroke="#ddd"
                            strokeWidth= {bass ? "5" : "0" }
                            // fill="rgba(255,255,255,0.1)"
                            r={radius/2}
                            cx="100"
                            cy="100"
                        />
                    </motion.svg>
                    </div>
                </div>

                <motion.div className='musicTextDiv' 
                    style={{width:325, transition:'0.3s',height:'50px', justifyItems:'center', marginLeft:'25px', marginRight:'25px'}} 
                >

                    {/*Song display*/}
                <div style={{width:'150px', height:'75px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center",alignItems: "center"}} >
                    <h2 style={{display:"flex", flexDirection:"row", width:'150px',justifyContent:'center',alignItems:'flex-end'}}>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"center"}}>
                            {currentSong.name}
                        </div>
                    </h2> 
                    <motion.button className="navbarButton"
                        ref = {buttonRefSmall2}
                        style={{ backgroundColor: 'rgba(0,0,0,0)' }}
                        onClick={handleMusicLibraryClick}
                        whileHover={{scale: 1.1}}
                        animate={{ scale: bass ? 1.5 : 1 }}
                        transition={{ type: "spring", duration: 0.2 }}
                        >
                            <span className="material-symbols-outlined">library_music</span>
                </motion.button>
                    {/* <h4 style={{display:"flex", flexDirection:"row"}}>{currentSong.artist}</h4> */}
                </div>
                </div>
                </motion.div>

                    {/* Sliders */}
                <div style={{ display: "flex", flexDirection: "column"}} >
                    <Slider value={volume} set={setVolume} 
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: "35px" }} ref={volumeRef}>
                            {volume > 66 ? "volume_up" : volume > 33 ? "volume_down" : volume > 0 ? "volume_mute" : "no_sound"}
                        </span>
                    </Slider>
                    <Slider
                        value={bounceRadiusIntensity}
                        set={setBounceRadiusIntensity}
                        // set={handleSliderChange}
                        min={0}
                        max={10}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: "35px" }} ref={intensityRef}>
                            earthquake
                        </span>
                    </Slider>

                </div>
            </div>


            {/* Progress bar */}
            <div className="volumeSlider" style={{ width:'100%', marginTop: '15px', color:'#ddd' }}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        // value={progress}
                        value={isNaN(progress) ? 0 : progress}
                        onChange={handleSeek}
                        style={{ width: '100%' }}
                    />
                </div>

            <div style={{ padding: "10px" }} />

            {/* Canvas */}
            <div id="canvasDiv" className="canvasDiv"> 
                <div className="visualizer">
                    {Array.from(audioData).slice(0, 64).map((value, index) => {
                        return (
                            <motion.div
                                key={index}
                                className="bar"
                                initial={{ height: 0 }}
                                animate={{ height: value }}
                                transition={{ duration: 0.05 }}
                            />
                        );
                    }) }
                </div>
                    
            </div>


        </div>
    );
}