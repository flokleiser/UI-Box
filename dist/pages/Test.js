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
exports.default = Test;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const Slider_1 = require("../components/Slider");
const Music_1 = require("../components/Music");
const Overlay_1 = __importDefault(require("../components/Overlay"));
const audiomotion_analyzer_1 = __importDefault(require("audiomotion-analyzer"));
function Test() {
    // export default function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    const [volume, setVolume] = (0, react_1.useState)(50);
    const [bass, setBass] = (0, react_1.useState)(false);
    const [test, setTest] = (0, react_1.useState)(0);
    const [audioData, setAudioData] = (0, react_1.useState)(new Uint8Array(0));
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = (0, react_1.useRef)(null);
    const audioRef = (0, react_1.useRef)(null);
    const analyserRef = (0, react_1.useRef)(null);
    const audioContextRef = (0, react_1.useRef)(null);
    const audioMotionRef = (0, react_1.useRef)(null);
    const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
    const [bounceRadiusIntensity, setBounceRadiusIntensity] = (0, react_1.useState)(1);
    // const [progress, setProgress] = useState(0)
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const radius = 100;
    const circumference = 2 * Math.PI * radius / 2;
    const initialOffset = circumference / 4;
    const [offset, setOffset] = (0, react_1.useState)(initialOffset);
    const [currentSongIndex, setCurrentSongIndex] = (0, react_1.useState)(0);
    const [bassIntensity, setBassIntensity] = (0, react_1.useState)(0);
    const [isOverlayVisible, setOverlayVisible] = (0, react_1.useState)(false);
    const [currentSong, setCurrentSong] = (0, react_1.useState)(Music_1.music[0]);
    const nextSong = () => {
        setCurrentSongIndex((currentSongIndex + 1) % Music_1.music.length);
    };
    //gui/equalizer
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
    (0, react_1.useEffect)(() => {
        if (canvasRef.current && audioRef.current) {
            const audioMotion = new audiomotion_analyzer_1.default(canvasRef.current);
            audioMotion.connectInput(audioRef.current);
            audioMotionRef.current = audioMotion;
        }
        return () => {
            if (audioMotionRef.current) {
                audioMotionRef.current.disconnectInput();
                audioMotionRef.current.destroy();
                audioMotionRef.current = null;
            }
        };
    }, []);
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.h1, null, "Test"),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
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
                react_1.default.createElement("div", { style: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "30px" } },
                    react_1.default.createElement(framer_motion_1.motion.button, { className: "playButton", style: { display: "flex", justifyContent: "center", alignItems: "center", }, onMouseDown: handlePlayClick, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                        react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: "50px" } }, isPlaying ? "play_arrow" : "pause")),
                    react_1.default.createElement(framer_motion_1.motion.svg, { style: { position: "absolute", zIndex: -10, }, width: "200", height: "200" },
                        react_1.default.createElement(framer_motion_1.motion.circle, { stroke: "#ddd", strokeWidth: "5", fill: "rgba(255,255,255,0.1)", r: radius / 2, cx: "100", cy: "100", strokeDasharray: circumference, strokeDashoffset: offset, initial: { strokeDashoffset: initialOffset }, animate: { strokeDashoffset: offset } }))),
                react_1.default.createElement("div", { style: { marginBottom: "-25px", textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start" } },
                    react_1.default.createElement("h3", { style: { display: "flex", width: '150px', marginLeft: "10px" } },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "music_note"),
                        currentSong.name))),
            react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column", paddingLeft: "50px", } },
                react_1.default.createElement(Slider_1.Slider, { value: volume, set: setVolume }, "Volume"),
                react_1.default.createElement(Slider_1.Slider, { value: bounceRadiusIntensity, set: setBounceRadiusIntensity, min: 0, max: 3 }, "Intensity"),
                react_1.default.createElement(Slider_1.Slider, { value: test, set: setTest }, "Test"))),
        react_1.default.createElement("div", { style: { padding: "5px" } }),
        react_1.default.createElement("div", { id: "canvasDiv", className: "canvasDiv", ref: canvasRef })));
}
