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
    const [test, setTest] = useState(0);
    const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const divRef= useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [currentSong, setCurrentSong] = useState(music[2]);
    const [isEqualizer, setIsEqualizer] = useState(false);  
    const [audioMotion, setAudioMotion] = useState<AudioMotionAnalyzer | null>(null);
    const [initSceneCount, setInitSceneCount] = useState(0);

    const radius = 85;
    const circumference = 2 * Math.PI * radius/2;
    const initialOffset = circumference;
    const [offset, setOffset] = useState(initialOffset);
    const [progress, setProgress] = useState(0);

    let smoothedIntensity = 0;

    let analyzer: AudioMotionAnalyzer | null;
    const [animationFrameId, setAnimationFrameId] = useState<number | null>(0);

    const buttonRef = useRef<HTMLButtonElement>(null)
    const buttonRefSmall1 = useRef<HTMLButtonElement>(null)
    const buttonRefSmall2 = useRef<HTMLButtonElement>(null)
    const outlineRef = useRef<SVGCircleElement>(null)

    const [bounceRadiusIntensity, setBounceRadiusIntensity] = useState(5);

    const normalizeBounceRadiusIntensity = (value:number) => {
        return (value / 10) * 2; // Normalize from 0-9 to 0-2
    };


    //gui/equalizer
    const handleEqualizerClick = () => {
        setIsEqualizer(!isEqualizer);

        if (audioMotion) {
            audioMotion.destroy();
            setAudioMotion(null);
        }
        if (!isEqualizer) {
            console.log('init equalizer')
        }
        else {
            resetScene();
        }
    }
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

    //canvas setup
    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasDiv = document.getElementById("canvasDiv");

        if (!canvas || !canvasDiv) return;

        const rect = canvasDiv.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;
        let animationFrameId: number;
        let particles: Particle[] = [];
        let bounceCenter = { x: canvas.width/ 2, y: canvas.height/ 2 };
        let bounceRadius = 1;

        const color = [
            getComputedStyle(document.documentElement).getPropertyValue(
                "--particle-color"
            ),
        ];

        class Particle {
            x: number;
            y: number;
            dest: { x: number; y: number };
            r: number;
            vx: number;
            vy: number;
            accX: number;
            accY: number;
            friction: number;
            color: string[];

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.dest = {
                    x: x,
                    y: y,
                };

                this.r = 5;

                this.vx = 0;
                this.vy = 0;

                this.accX = 0;
                this.accY = 0;
                this.friction = 0.9;
                this.color = color;
            }

            render() {
                this.accX = (this.dest.x - this.x) / 100;
                this.accY = (this.dest.y - this.y) / 100;

                this.vx += this.accX;
                this.vy += this.accY;
                this.vx *= this.friction;
                this.vy *= this.friction;

                this.x += this.vx;
                this.y += this.vy;

                ctx.fillStyle = this.color[0];
                ctx.beginPath();

                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);

                ctx.fill();

                let a = this.x - bounceCenter.x;
                let b = this.y - bounceCenter.y;

                let distance = Math.sqrt(a * a + b * b);

                if (distance < bounceRadius * 60) {
                    this.accX = (this.x - bounceCenter.x) / 10;
                    this.accY = (this.y - bounceCenter.y) / 10;

                    this.vx += this.accX;
                    this.vy += this.accY;
                }

                if (distance > bounceRadius * 250) {
                    this.vx += this.accX;
                    this.vy += this.accY;
                    this.accX = (this.dest.x - this.x) / 5;
                    this.accY = (this.dest.y - this.y) / 5;
                }
            }
        }

        const resizeCanvas = () => {
            const rect = canvasDiv.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        const initScene = () => {

            const rect = canvasDiv.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const particleSpacing = 20;

            particles = [];
            for (let x = -rect.width; x <= rect.width; x += particleSpacing) {
                for (
                    let y = -rect.height;
                    y <= rect.height;
                    y += particleSpacing
                ) {
                    particles.push(new Particle(centerX + x, centerY + y));
                }
            }
        };


        const render = () => {

            if (analyserRef.current) {
                const dataArray = new Uint8Array(
                    analyserRef.current.frequencyBinCount
                );
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);

                const bassRange = dataArray.slice(0, 2);
                const intensity = bassRange.reduce(
                    (sum, value) => sum + value,0);

                const smoothingFactor = 0.1;
                smoothedIntensity += (intensity - smoothedIntensity) * smoothingFactor;

                const bassThreshold = 500
                const bass = smoothedIntensity > bassThreshold

                // const bass = intensity > bassThreshold
         
                setBass(bass);
                // bounceRadius = bass ? 1.5 : 0;

                const normalizedBounceRadiusIntensity = normalizeBounceRadiusIntensity(bounceRadiusIntensity);
                const baseBounceRadius = bass ? 1.5 : 0;
                // bounceRadius = baseBounceRadius * bounceRadiusIntensity
                bounceRadius = baseBounceRadius * normalizedBounceRadiusIntensity; 
                
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.render();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        initScene();

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        render();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    // }, [resetTrigger,initSceneCount]);
    }, [resetTrigger, bounceRadiusIntensity]);

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
        setInitSceneCount(count => count + 1);
    }
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = (parseFloat(e.target.value) / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    //new audiomotion-analyzer
    useEffect(() => {
        if (audioRef.current && divRef.current && !audioMotion) {

            analyzer = new AudioMotionAnalyzer(divRef.current, {
                source: audioRef.current,
                showScaleX: false,
                showPeaks:false,
                showBgColor: false,
                overlay: true,
                mode:4,
                roundBars: true,
                alphaBars: true,
                reflexFit: true,
                reflexBright: 1,
                mirror: 0,
                reflexAlpha: 1,
                reflexRatio: 0.5,
                linearAmplitude: true,
                linearBoost: 1.5,
                // gradient: 'white-gray',
            });
;

            // analyzer.registerGradient('white-gray', {
            //     bgColor: '#111', // Optional background color
            //     dir: 'h', // Horizontal gradient
            //     colorStops: [
            //         'white', // Start color
            //         'gray'   // End color
            //     ]
            // });

            setAudioMotion(analyzer);

            

            const animate = () => {
                if (analyzer) {
                    const bassEnergy = analyzer.getEnergy(20, 250);
                    if (bassEnergy !== null) { // Add null check for bassEnergy
                        const scale = 1 + bassEnergy;
                        if (buttonRef.current && buttonRefSmall1.current && buttonRefSmall2.current && outlineRef.current) {
                            buttonRef.current.style.transform = `scale(${scale})`;
                            buttonRefSmall1.current.style.transform = `scale(${scale})`;
                            buttonRefSmall2.current.style.transform = `scale(${scale})`;
                            outlineRef.current.style.strokeWidth = `${0 + (bassEnergy) * 5}px`;
                        }
                    }
                }
                setAnimationFrameId(requestAnimationFrame(animate));
            };

            animate();
        }
    
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        }
    
    }, [audioRef.current, divRef.current, audioMotion]);


    return (
        <div className="bodyCenter">
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <motion.h1>Musializer</motion.h1>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                {/* analyzer switch */}
                <motion.button className="navbarButton"
                ref = {buttonRefSmall1}
                style={{ backgroundColor: 'rgba(0,0,0,0)' }}
                onClick={handleEqualizerClick}
                whileHover={{scale: 1.1}}
                animate={{ scale: bass ? 1.5 : 1 }}
                transition={{ type: "spring", duration: 0.2 }}
                >
                    <span className="material-symbols-outlined">
                        {/* equalizer */}
                        {isEqualizer ? "snowing" : "equalizer"}
                    </span>
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
                        {/* <span className="material-symbols-outlined">
                            music_note
                        </span> */}
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
                        <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>
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
                        <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>
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
                {isEqualizer ? (
                <div id="canvasDiv" className="canvasDiv" style={{border:0}}ref={divRef}>
                    <audio ref={audioRef} style={{width:"100%"}}>
                        <source src={currentSong.file} type="audio/mpeg" />
                    </audio>
                </div>
                ):(
                    <canvas ref={canvasRef} style={{ position: "absolute", marginLeft: "-3px", marginTop: "-3px", }}></canvas>
                )}
            </div>


        </div>
    );
}