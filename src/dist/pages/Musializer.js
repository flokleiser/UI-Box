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
const audiomotion_analyzer_1 = __importDefault(require("audiomotion-analyzer"));
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
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const [isOverlayVisible, setOverlayVisible] = (0, react_1.useState)(false);
    const [currentSong, setCurrentSong] = (0, react_1.useState)(Music_1.music[2]);
    const [isEqualizer, setIsEqualizer] = (0, react_1.useState)(false);
    const [audioMotion, setAudioMotion] = (0, react_1.useState)(null);
    const [initSceneCount, setInitSceneCount] = (0, react_1.useState)(0);
    const radius = 85;
    const [progress, setProgress] = (0, react_1.useState)(0);
    let smoothedIntensity = 0;
    let analyzer;
    const [animationFrameId, setAnimationFrameId] = (0, react_1.useState)(0);
    const buttonRef = (0, react_1.useRef)(null);
    const buttonRefSmall1 = (0, react_1.useRef)(null);
    const buttonRefSmall2 = (0, react_1.useRef)(null);
    const buttonRefSmall3 = (0, react_1.useRef)(null);
    const buttonRefSmall4 = (0, react_1.useRef)(null);
    const outlineRef = (0, react_1.useRef)(null);
    const volumeRef = (0, react_1.useRef)(null);
    const intensityRef = (0, react_1.useRef)(null);
    const [bounceRadiusIntensity, setBounceRadiusIntensity] = (0, react_1.useState)(5);
    const [equalizerType, setEqualizerType] = (0, react_1.useState)("particles");
    const [activeEqualizer, setActiveEqualizer] = (0, react_1.useState)(null);
    const normalizeBounceRadiusIntensity = (value) => {
        return (value / 10) * 2;
    };
    //switching equalizers & cleanup
    (0, react_1.useEffect)(() => {
        const cleanup = () => {
            if (equalizerType === "audioMotion" && audioMotion) {
                audioMotion.destroy();
                setAudioMotion(null);
                console.log('unhook audiomotion');
            }
            if (equalizerType === "particles") {
                resetScene();
            }
            else if (equalizerType === "old") {
                console.log('test old');
            }
        };
        cleanup();
        setActiveEqualizer(equalizerType);
        // switch (equalizerType) {
        //     case "particles":
        //         console.log('particles')
        //         break;
        //     case "audioMotion":
        //         console.log('audiomotion')
        //         break;
        //     case "old":
        //         console.log('old')
        //         break;
        //     default:
        //         break;
        // }
    }, [equalizerType]);
    //gui
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
    //song selection
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
        }
    }, [currentSong]);
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
        const rect = canvasDiv.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
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
            if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);
                const bassRange = dataArray.slice(0, 2);
                const intensity = bassRange.reduce((sum, value) => sum + value, 0);
                // const hiHatRange = dataArray.slice(3, 10);
                const smoothingFactor = 0.1;
                smoothedIntensity += (intensity - smoothedIntensity) * smoothingFactor;
                const bassThreshold = 500;
                const bass = smoothedIntensity > bassThreshold;
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
        setInitSceneCount(count => count + 1);
    }
    const handleSeek = (e) => {
        const newTime = (parseFloat(e.target.value) / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };
    //new audiomotion-analyzer
    (0, react_1.useEffect)(() => {
        if (audioRef.current && divRef.current && !audioMotion) {
            analyzer = new audiomotion_analyzer_1.default(divRef.current, {
                source: audioRef.current,
                showScaleX: false,
                showPeaks: false,
                showBgColor: false,
                overlay: true,
                mode: 4,
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
                    const hiHatEnergy = analyzer.getEnergy(1000, 2000);
                    if (bassEnergy !== null) { // Add null check for bassEnergy
                        const scale = 1 + (bassEnergy * 2);
                        if (buttonRef.current && buttonRefSmall1.current && buttonRefSmall2.current && outlineRef.current && buttonRefSmall3.current && buttonRefSmall4.current && volumeRef.current && intensityRef.current) {
                            buttonRef.current.style.transform = `scale(${scale})`;
                            buttonRefSmall1.current.style.transform = `scale(${scale})`;
                            buttonRefSmall2.current.style.transform = `scale(${scale})`;
                            buttonRefSmall3.current.style.transform = `scale(${scale})`;
                            buttonRefSmall4.current.style.transform = `scale(${scale})`;
                            outlineRef.current.style.strokeWidth = `${0 + (bassEnergy) * 5}px`;
                            // volumeRef.current.style.transform = `scale(${1 + bassEnergy})`;
                            // intensityRef.current.style.transform = `scale(${1 + bassEnergy})`;
                        }
                    }
                    if (hiHatEnergy !== null) {
                        const hiHatScale = 1 + (hiHatEnergy * 5);
                        if (volumeRef.current && intensityRef.current) {
                            volumeRef.current.style.transform = `scale(${hiHatScale})`;
                            intensityRef.current.style.transform = `scale(${hiHatScale})`;
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
        };
    }, [audioRef.current, divRef.current, audioMotion]);
    //old equlaizer
    (0, react_1.useEffect)(() => {
        if (equalizerType === "old") {
            console.log('init old');
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
        }
    }, []);
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.h1, null, "Musializer"),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
                react_1.default.createElement(framer_motion_1.motion.button
                // className={`navbarButton ${activeEqualizer === "particles" ? "equalizerActive" : ""}`}
                , { 
                    // className={`navbarButton ${activeEqualizer === "particles" ? "equalizerActive" : ""}`}
                    className: `equalizerButton ${activeEqualizer === "particles" ? "equalizerActive" : ""}`, ref: buttonRefSmall1, style: { backgroundColor: 'rgba(0,0,0,0)' }, onClick: () => setEqualizerType("particles"), whileHover: { scale: 1.1 }, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "snowing")),
                react_1.default.createElement(framer_motion_1.motion.button
                // className={`navbarButton ${activeEqualizer === "audioMotion" ? "equalizerActive" : ""}`}
                , { 
                    // className={`navbarButton ${activeEqualizer === "audioMotion" ? "equalizerActive" : ""}`}
                    className: `equalizerButton ${activeEqualizer === "audioMotion" ? "equalizerActive" : ""}`, ref: buttonRefSmall3, style: { backgroundColor: 'rgba(0,0,0,0)' }, onClick: () => setEqualizerType("audioMotion"), whileHover: { scale: 1.1 }, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "earthquake")),
                react_1.default.createElement(framer_motion_1.motion.button
                // className={`navbarButton ${activeEqualizer === "old" ? "equalizerActive" : ""}`}
                , { 
                    // className={`navbarButton ${activeEqualizer === "old" ? "equalizerActive" : ""}`}
                    className: `equalizerButton ${activeEqualizer === "old" ? "equalizerActive" : ""}`, ref: buttonRefSmall4, style: { backgroundColor: 'rgba(0,0,0,0)' }, onClick: () => setEqualizerType("old"), whileHover: { scale: 1.1 }, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "equalizer")),
                react_1.default.createElement(Overlay_1.default, { isVisible: isOverlayVisible, onClose: handleCloseOverlay },
                    react_1.default.createElement("h3", null,
                        react_1.default.createElement("div", null, Music_1.music.map((song, index) => (react_1.default.createElement("div", { className: "overlayContent", style: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }, key: index, onClick: () => handleSongSelect(song) },
                            song.name,
                            " - ",
                            song.artist)))))))),
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", } },
            react_1.default.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } },
                react_1.default.createElement("div", { style: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "15px", marginRight: '15px' } },
                    react_1.default.createElement(framer_motion_1.motion.button, { ref: buttonRef, className: "playButton", style: { display: "flex", justifyContent: "center", alignItems: "center", }, onMouseDown: handlePlayClick, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                        react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: "35px" } }, isPlaying ? "play_arrow" : "pause")),
                    react_1.default.createElement(framer_motion_1.motion.svg, { style: { position: "absolute", zIndex: -10, }, width: "200", height: "200" },
                        react_1.default.createElement(framer_motion_1.motion.circle, { ref: outlineRef, className: "progressCircle", stroke: "#ddd", strokeWidth: bass ? "5" : "0", 
                            // fill="rgba(255,255,255,0.1)"
                            r: radius / 2, cx: "100", cy: "100" })))),
            react_1.default.createElement(framer_motion_1.motion.div, { className: 'musicTextDiv', style: { width: 325, transition: '0.3s', height: '50px', justifyItems: 'center', marginLeft: '25px', marginRight: '25px' } },
                react_1.default.createElement("div", { style: { width: '150px', height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    react_1.default.createElement("div", { style: { textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" } },
                        react_1.default.createElement("h2", { style: { display: "flex", flexDirection: "row", width: '150px', justifyContent: 'center', alignItems: 'flex-end' } },
                            react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center" } }, currentSong.name)),
                        react_1.default.createElement(framer_motion_1.motion.button, { className: "navbarButton", ref: buttonRefSmall2, style: { backgroundColor: 'rgba(0,0,0,0)' }, onClick: handleMusicLibraryClick, whileHover: { scale: 1.1 }, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                            react_1.default.createElement("span", { className: "material-symbols-outlined" }, "library_music"))))),
            react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column" } },
                react_1.default.createElement(Slider_1.Slider, { value: volume, set: setVolume },
                    react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: "35px" }, ref: volumeRef }, volume > 66 ? "volume_up" : volume > 33 ? "volume_down" : volume > 0 ? "volume_mute" : "no_sound")),
                react_1.default.createElement(Slider_1.Slider, { value: bounceRadiusIntensity, set: setBounceRadiusIntensity, 
                    // set={handleSliderChange}
                    min: 0, max: 10 },
                    react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: "35px" }, ref: intensityRef }, "earthquake")))),
        react_1.default.createElement("div", { className: "volumeSlider", style: { width: '100%', marginTop: '15px', color: '#ddd', paddingBottom: '10px', marginBottom: '10px' } },
            react_1.default.createElement("input", { type: "range", min: "0", max: "100", value: isNaN(progress) ? 0 : progress, onChange: handleSeek, style: { width: '100%' } })),
        react_1.default.createElement("div", { id: "canvasDiv", className: "canvasDiv" },
            equalizerType === "particles" && (react_1.default.createElement("canvas", { ref: canvasRef, style: { position: "absolute", marginLeft: "-3px", marginTop: "-3px", } })),
            equalizerType === "audioMotion" && (react_1.default.createElement("div", { id: "canvasDiv", className: "canvasDiv", style: { border: 0 }, ref: divRef },
                react_1.default.createElement("audio", { ref: audioRef, style: { width: "100%" } },
                    react_1.default.createElement("source", { src: currentSong.file, type: "audio/mpeg" })))),
            equalizerType === "old" && (react_1.default.createElement("div", { className: "visualizer" }, Array.from(audioData).slice(0, 64).map((value, index) => {
                return (react_1.default.createElement(framer_motion_1.motion.div, { key: index, className: "bar", initial: { height: 0 }, animate: { height: value }, transition: { duration: 0.05 } }));
            }))))));
}
