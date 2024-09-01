import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "../components/Slider";
import { music} from "../components/Music";
import Overlay from "../components/Overlay";

import AudioMotionAnalyzer from 'audiomotion-analyzer';
import check1 from '../media/sounds/check1.mp3'

export default function Test() {


// export default function Musializer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(50);
    const [bass, setBass] = useState(false);
    const [test, setTest] = useState(0);

    const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioMotionRef = useRef<AudioMotionAnalyzer| null>(null);



    const [resetTrigger, setResetTrigger] = useState(0);

    const [bounceRadiusIntensity, setBounceRadiusIntensity] = useState(1);

    // const [progress, setProgress] = useState(0)

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const radius = 100;
    const circumference = 2 * Math.PI * radius/2;
    const initialOffset = circumference/4;

    const [offset, setOffset] = useState(initialOffset);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [bassIntensity, setBassIntensity] = useState(0);

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [currentSong, setCurrentSong] = useState(music[0]);


    const nextSong = () => {
        setCurrentSongIndex((currentSongIndex + 1) % music.length);
    }

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


    //song selection and duration
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
        }
    }, [currentSong]);
    useEffect(() => {
        const audio = audioRef.current;
        const updateAudioDuration = () => {
            setDuration(audio!.duration);
        }

        if (audio) {
            audio.addEventListener('loadedmetadata', updateAudioDuration);
        }
        return () => {  
            if (audio) {
            audio?.removeEventListener('loadedmetadata', updateAudioDuration);
            }
        }
    })

    //reset canvas to center it
    useEffect(() => {
        const timeoutId = setTimeout(resetScene, 100);
        return () => clearTimeout(timeoutId);
    }, []);

    //reset canvas on theme change
    useEffect(() => {
        const handleThemeToggle = () => resetScene();
        setTimeout(() => {
            const darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
            if (darkmodeToggleButton) {
                darkmodeToggleButton.addEventListener("click",handleThemeToggle);
            }
        }, 1000);

        return () => {
            const darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener("click",handleThemeToggle);
            }
        };
    }, []);


    //audio duration and time
    useEffect(() => {
        let audio = audioRef.current;
        if (!audio) return;

        const setAudioDuration = () => {
            setDuration(audio.duration);
        };
        const setAudioTime = () => {
            setCurrentTime(audio.currentTime);
            const offset =
                circumference - (currentTime / duration) * circumference;
            setOffset(offset);
        };
        audio.addEventListener("durationchange", setAudioDuration);
        audio.addEventListener("timeupdate", setAudioTime);

        return () => {
            audio.removeEventListener("durationchange", setAudioDuration);
            audio.removeEventListener("timeupdate", setAudioTime);
        };
    });

    //Old visualizer audio-updates
    useEffect(() => {
        const updateAudioData = () => {
          if (analyserRef.current) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            setAudioData(dataArray);

            const bassRange = dataArray.slice(0, 2);
            const intensity = bassRange.reduce((sum, value) => sum + value, 0);
            setBassIntensity(intensity);

          }
          requestAnimationFrame(updateAudioData);
        };
        updateAudioData();
      }, []);

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
    function resetScene() {
        setResetTrigger((prev) => prev + 1);
    }

        useEffect(() => {
        if (canvasRef.current && audioRef.current) {
            const audioMotion= new AudioMotionAnalyzer(canvasRef.current)
            audioMotion.connectInput(audioRef.current);
            audioMotionRef.current = audioMotion;
            }        

            return () => {
                if (audioMotionRef.current) {
                    audioMotionRef.current.disconnectInput();
                    audioMotionRef.current.destroy();
                    audioMotionRef.current = null;
                }
            }
        }, [])
 
    return (
        <div className="bodyCenter">
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <motion.h1>Test</motion.h1>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                <motion.button className="navbarButton"
                style={{ backgroundColor: 'rgba(0,0,0,0)' }}
                onClick={handleMusicLibraryClick}
                whileHover={{scale: 1.1}}
                animate={{ scale: bass ? 1.5 : 1 }}
                transition={{ type: "spring", duration: 0.2 }}
                >
                    <span className="material-symbols-outlined">library_music</span>
                </motion.button>
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


            <div
                style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center",}}>
                <div style={{position: "relative",display: "flex",flexDirection: "column",justifyContent: "center",alignItems:"flex-start"}}>
                    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center",marginLeft:"30px" }}>
                    <motion.button
                        className="playButton"
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", }}
                        onMouseDown={handlePlayClick}
                        animate={{ scale: bass ? 1.5 : 1 }}
                        transition={{ type: "spring", duration: 0.2 }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: "50px" }} >
                            {isPlaying ? "play_arrow" : "pause"}
                        </span>
                    </motion.button>

                    <motion.svg
                        style={{ position: "absolute", zIndex: -10, }}
                        width="200"
                        height="200"
                    >
                        <motion.circle
                            stroke="#ddd"
                            strokeWidth="5"
                            fill="rgba(255,255,255,0.1)"
                            r={radius/2}
                            cx="100"
                            cy="100"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            initial={{ strokeDashoffset: initialOffset }}
                            animate={{ strokeDashoffset: offset }}
                        />
                    </motion.svg>
                    </div>

                    <div style={{marginBottom: "-25px", textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center",alignItems: "flex-start"}} >
                        <h3 style={{display:"flex", width:'150px', marginLeft:"10px"}}>
                        <span className="material-symbols-outlined">
                            music_note
                        </span>
                            {currentSong.name}
                        </h3> 
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "50px", }} >
                    <Slider value={volume} set={setVolume} 
                    >
                        Volume
                    </Slider>
                    <Slider
                        value={bounceRadiusIntensity}
                        set={setBounceRadiusIntensity}
                        min={0}
                        max={3}
                    >
                        Intensity
                    </Slider>
                    <Slider value={test} set={setTest}>
                        Test
                    </Slider>
                </div>
            </div>

            <div style={{ padding: "5px" }} />

            <div id="canvasDiv" className="canvasDiv" ref={canvasRef}>
            </div>


        </div>
    );
}
