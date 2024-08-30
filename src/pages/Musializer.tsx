import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "../components/Slider";
// import check1 from "../../assets/media/sounds/check1.mp3";

// import {music} from "../components/Music";
// import { check1Sound } from "../components/Music";
import { music} from "../components/Music";

export default function Musializer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(50);
    const [bass, setBass] = useState(false);
    const [test, setTest] = useState(0);
    const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [bounceRadiusIntensity, setBounceRadiusIntensity] = useState(1);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const initialOffset = circumference;

    const [offset, setOffset] = useState(initialOffset);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const currentSong = music[currentSongIndex];

    // const [switchSong, setSwitchSong] = useState(0);

    const nextSong = () => {
        // setCurrentSongIndex(prevIndex) => (prevIndex + 1) % music.length;
        // setCurrentSongIndex(currentSongIndex) => (currentSongIndex+ 1) % music.length;
        setCurrentSongIndex((currentSongIndex + 1) % music.length);
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
            // console.log(audioRef.current.)
        }
    }, [currentSong]);

    useEffect(() => {
        const timeoutId = setTimeout(resetScene, 100);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const handleThemeToggle = () => resetScene();
        setTimeout(() => {
            const darkmodeToggleButton = document.getElementById(
                "darkmodeToggleButton"
            );
            if (darkmodeToggleButton) {
                darkmodeToggleButton.addEventListener(
                    "click",
                    handleThemeToggle
                );
            }
        }, 1000);

        return () => {
            const darkmodeToggleButton = document.getElementById(
                "darkmodeToggleButton"
            );
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener(
                    "click",
                    handleThemeToggle
                );
            }
        };
    }, []);

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

    //audio setup
    useEffect(() => {
        if (!audioRef.current) {
            // audioRef.current = new Audio("./media/sounds/check1.mp3");
            // audioRef.current = new Audio(check1);
            // audioRef.current = new Audio(check1Sound.file);
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

    // function switchMusic() {
    //     if (audioRef.current === check1Sound.file) {
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0;
    //         audioRef.current.play();
    //     }
    // }
    

    //canvas setup
    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasDiv = document.getElementById("canvasDiv");
        if (!canvas || !canvasDiv) return;

        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;
        let animationFrameId: number;
        let particles: Particle[] = [];
        let bounceCenter = { x: canvas.width / 2, y: canvas.height / 2 };
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
                // this.friction = 0.7;
                this.friction = 0.9;

                this.color = color;

                // this.frequency = 0.01;
                // this.amplitude = 100;
            }

            render() {
                // this.dest.x = this.x
                // this.dest.y = canvas!.height/2 + Math.sin((this.x * this.frequency) + (Date.now() * 0.001)) * this.amplitude;
                // this.dest.y = Math.sin((this.x * this.frequency) + (Date.now() * 0.001)) * this.amplitude;
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
                    // this.accX = this.x - bounceCenter.x;
                    // this.accY = this.y - bounceCenter.y;

                    this.accX = (this.x - bounceCenter.x) / 10;
                    this.accY = (this.y - bounceCenter.y) / 10;

                    this.vx += this.accX;
                    this.vy += this.accY;
                }

                if (distance > bounceRadius * 250) {
                    // this.accX = (this.dest.x - this.x) / 10;
                    // this.accY = (this.dest.y - this.y) / 10;
                    this.vx += this.accX;
                    this.vy += this.accY;
                    this.accX = (this.dest.x - this.x) / 5;
                    this.accY = (this.dest.y - this.y) / 5;
                    // this.vx += this.accX * 2;
                    // this.vy += this.accY * 2;
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
            const rect = canvasDiv.getBoundingClientRect();
            // let bounceCenter = { x: rect.width / 2, y: rect.height / 2 };

            if (analyserRef.current) {
                const dataArray = new Uint8Array(
                    analyserRef.current.frequencyBinCount
                );
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);

                const bassRange = dataArray.slice(0, 2);
                const intensity = bassRange.reduce(
                    (sum, value) => sum + value,
                    0
                );
                const bass = intensity > 509;
                setBass(bass);
                bounceRadius = bass ? 1.5 : 0;
                bounceRadius = bass ? bounceRadiusIntensity : 0;
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
    }, [resetTrigger]);

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
            if (audioRef.current) {
                audioRef.current.currentTime = 15;
            }
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    };
    function resetScene() {
        setResetTrigger((prev) => prev + 1);
    }

    return (
        <div className="bodyCenter">
            <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <motion.h1>Musializer</motion.h1>

            <motion.button
              className="navbarButton"
              style={{ backgroundColor: 'rgba(0,0,0,0)' }}
              onMouseDown={nextSong}
              whileHover={{scale: 1.1}}
              animate={{ scale: bass ? 1.5 : 1 }}
              transition={{ type: "spring", duration: 0.2 }}
            >
              <span className="material-symbols-outlined">library_music</span>
            </motion.button>
          </div>


            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >



                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >

                    <div style={{
                       position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                        >
                    <motion.button
                        className="playButton"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onMouseDown={handlePlayClick}
                        animate={{ scale: bass ? 1.5 : 1 }}
                        transition={{ type: "spring", duration: 0.2 }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "50px" }}
                        >
                            {isPlaying ? "play_arrow" : "pause"}
                        </span>
                    </motion.button>

                    <motion.svg
                        style={{
                            position: "absolute",
                            zIndex: -10,
                        }}
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

                    <div 
                    style={{marginBottom: "-25px", textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}
                    >
                        <h3 
                        >{currentSong.name}</h3> 
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "50px",
                    }}
                >
                    <Slider value={volume} set={setVolume}>
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

            <div id="canvasDiv" className="canvasDiv">
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "-3px",
                        marginTop: "-3px",
                    }}
                ></canvas>
            </div>
        </div>
    );
}
