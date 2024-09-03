"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Musializer;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const Slider_1 = require("../components/Slider");
const Music_1 = require("../components/Music");
const Overlay_1 = __importDefault(require("../components/Overlay"));
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    const [volume, setVolume] = (0, react_1.useState)(50);
    const [bass, setBass] = (0, react_1.useState)(false);
    const [test, setTest] = (0, react_1.useState)(0);
    const [audioData, setAudioData] = (0, react_1.useState)(new Uint8Array(0));
    const canvasRef = (0, react_1.useRef)(null);
    const divRef = (0, react_1.useRef)(null);
    const audioRef = (0, react_1.useRef)(null);
    const analyserRef = (0, react_1.useRef)(null);
    const audioContextRef = (0, react_1.useRef)(null);
    const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
    const [bounceRadiusIntensity, setBounceRadiusIntensity] = (0, react_1.useState)(1);
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const radius = 100;
    const circumference = 2 * Math.PI * radius / 2;
    const initialOffset = circumference;
    const [offset, setOffset] = (0, react_1.useState)(initialOffset);
    const [currentSongIndex, setCurrentSongIndex] = (0, react_1.useState)(0);
    const [bassIntensity, setBassIntensity] = (0, react_1.useState)(0);
    const [isOverlayVisible, setOverlayVisible] = (0, react_1.useState)(false);
    const [currentSong, setCurrentSong] = (0, react_1.useState)(Music_1.music[0]);
    const [isEqualizer, setIsEqualizer] = (0, react_1.useState)(false);
    const [audioMotion, setAudioMotion] = (0, react_1.useState)(null);
    const logScale = (index, total) => {
        const minp = 0;
        const maxp = Math.log10(total);
        const minv = Math.log10(1);
        const maxv = Math.log10(total);
        const scale = (maxv - minv) / (maxp - minp);
        return Math.log10(index + 1) * scale;
    };
    //gui/equalizer
    const handleEqualizerClick = () => {
        setIsEqualizer(!isEqualizer);
        console.log('equalizer', isEqualizer);
        setTimeout(() => {
            resetScene();
        }, 100);
    };
    const handleMusicLibraryClick = () => {
        setOverlayVisible(true);
    };
    const handleCloseOverlay = () => {
        setOverlayVisible(false);
    };
    const handleSongSelect = (song) => {
        setCurrentSong(song);
        setOverlayVisible(false);
    };
    //song selection and duration
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
        }
    }, [currentSong]);
    (0, react_1.useEffect)(() => {
        const audio = audioRef.current;
        const updateAudioDuration = () => {
            setDuration(audio.duration);
        };
        if (audio) {
            audio.addEventListener('loadedmetadata', updateAudioDuration);
        }
        return () => {
            if (audio) {
                audio === null || audio === void 0 ? void 0 : audio.removeEventListener('loadedmetadata', updateAudioDuration);
            }
        };
    });
    //reset canvas to center it
    (0, react_1.useEffect)(() => {
        const timeoutId = setTimeout(resetScene, 100);
        return () => clearTimeout(timeoutId);
    }, []);
    //reset canvas on theme change
    (0, react_1.useEffect)(() => {
        const handleThemeToggle = () => resetScene();
        setTimeout(() => {
            const darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
            if (darkmodeToggleButton) {
                darkmodeToggleButton.addEventListener("click", handleThemeToggle);
            }
        }, 1000);
        return () => {
            const darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener("click", handleThemeToggle);
            }
        };
    }, []);
    //audio duration and time
    (0, react_1.useEffect)(() => {
        let audio = audioRef.current;
        if (!audio)
            return;
        const setAudioDuration = () => {
            setDuration(audio.duration);
        };
        const setAudioTime = () => {
            setCurrentTime(audio.currentTime);
            const offset = circumference - (currentTime / duration) * circumference;
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
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(currentSong.file);
            audioContextRef.current = new (window.AudioContext ||
                window.webkitAudioContext)();
            const source = audioContextRef.current.createMediaElementSource(audioRef.current);
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
    (0, react_1.useEffect)(() => {
        const canvas = canvasRef.current;
        const canvasDiv = document.getElementById("canvasDiv");
        if (!canvas || !canvasDiv)
            return;
        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        });
        let animationFrameId;
        let particles = [];
        let bounceCenter = { x: canvas.width / 2, y: canvas.height / 2 };
        let bounceRadius = 1;
        const color = [
            getComputedStyle(document.documentElement).getPropertyValue("--particle-color"),
        ];
        class Particle {
            constructor(x, y) {
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
                for (let y = -rect.height; y <= rect.height; y += particleSpacing) {
                    particles.push(new Particle(centerX + x, centerY + y));
                }
            }
        };
        const render = () => {
            const rect = canvasDiv.getBoundingClientRect();
            // let bounceCenter = { x: rect.width / 2, y: rect.height / 2 };
            if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);
                const bassRange = dataArray.slice(0, 2);
                const intensity = bassRange.reduce((sum, value) => sum + value, 0);
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
    const handleKeyDown = (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            handlePlayClick();
        }
    };
    const handlePlayClick = () => {
        var _a, _b;
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            (_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.play();
        }
        else {
            (_b = audioRef.current) === null || _b === void 0 ? void 0 : _b.pause();
        }
    };
    function resetScene() {
        setResetTrigger((prev) => prev + 1);
    }
    const handleProgressClick = (e) => {
        if (audioRef.current) {
            //     const progressBar = e.target;
            //     const newTime = (e.nativeEvent.offsetX / (progressBar as HTMLDivElement).offsetWidth) * duration;
            //     audioRef.current.currentTime = newTime;
            // }
            const progressBar = e.target;
            const clickPosition = e.nativeEvent.offsetX;
            const progressBarWidth = progressBar.offsetWidth;
            const newTime = (clickPosition / progressBarWidth) * duration;
            console.log('Click position:', clickPosition);
            console.log('Progress bar width:', progressBarWidth);
            console.log('Duration:', duration);
            console.log('New time:', newTime);
            if (!isNaN(newTime) && newTime >= 0 && newTime <= duration) {
                audioRef.current.currentTime = newTime;
            }
        }
    };
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.h1, null, "Musializer"),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
                react_1.default.createElement(framer_motion_1.motion.button, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)' }, onClick: handleEqualizerClick, whileHover: { scale: 1.1 }, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "equalizer")),
                react_1.default.createElement(framer_motion_1.motion.button, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)' }, onClick: handleMusicLibraryClick, whileHover: { scale: 1.1 }, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "library_music")),
                react_1.default.createElement(Overlay_1.default, { isVisible: isOverlayVisible, onClose: handleCloseOverlay },
                    react_1.default.createElement("h3", null,
                        react_1.default.createElement("div", null, Music_1.music.map((song, index) => (react_1.default.createElement("div", { className: "overlayContent", style: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }, key: index, onClick: () => handleSongSelect(song) },
                            song.name,
                            " - ",
                            song.artist)))))))),
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", } },
            react_1.default.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" } },
                react_1.default.createElement("div", { style: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "30px", marginTop: "15px" } },
                    react_1.default.createElement(framer_motion_1.motion.button, { className: "playButton", style: { display: "flex", justifyContent: "center", alignItems: "center", }, onMouseDown: handlePlayClick, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                        react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: "50px" } }, isPlaying ? "play_arrow" : "pause")),
                    react_1.default.createElement(framer_motion_1.motion.svg, { style: { position: "absolute", zIndex: -10, }, width: "200", height: "200" },
                        react_1.default.createElement(framer_motion_1.motion.circle, { stroke: "#ddd", strokeWidth: bass ? "5" : "0", fill: "rgba(255,255,255,0.1)", r: radius / 2, cx: "100", cy: "100" }))),
                react_1.default.createElement("div", { style: { marginBottom: "-25px", textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start" } },
                    react_1.default.createElement("h3", { style: { display: "flex", width: '150px', marginLeft: "10px" } },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "music_note"),
                        currentSong.name))),
            react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column" } },
                react_1.default.createElement(Slider_1.Slider, { value: volume, set: setVolume }, "Volume"),
                react_1.default.createElement(Slider_1.Slider, { value: bounceRadiusIntensity, set: setBounceRadiusIntensity, min: 0, max: 3 }, "Intensity"),
                react_1.default.createElement("div", { className: "custom-audio-controls", style: { marginTop: "10px", marginBottom: "5px", width: '100%' } },
                    react_1.default.createElement("div", { className: "progress-bar", onClick: handleProgressClick },
                        react_1.default.createElement("div", { className: "progress", style: { width: `${(currentTime / duration) * 100}%` } }))))),
        react_1.default.createElement("div", { style: { padding: "5px" } }),
        react_1.default.createElement("div", { id: "canvasDiv", className: "canvasDiv" }, isEqualizer ? (react_1.default.createElement("div", { className: "visualizer" }, Array.from(audioData).slice(0, 64).map((value, index) => {
            const logValue = value * logScale(index, 64);
            return (react_1.default.createElement(framer_motion_1.motion.div, { key: index, className: "bar", initial: { height: 0.5 }, animate: { height: value }, 
                // animate={{ height: logValue }}
                transition: { duration: 0.05 } }));
        }))) : (react_1.default.createElement("canvas", { ref: canvasRef, style: { position: "absolute", marginLeft: "-3px", marginTop: "-3px", } })))));
}