"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Musializer;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const framer_motion_1 = require("framer-motion");
const Slider_1 = require("../components/Slider");
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(true);
    const [volume, setVolume] = (0, react_2.useState)(50);
    const [test, setTest] = (0, react_2.useState)(0);
    const [bass, setBass] = (0, react_2.useState)(false);
    const [audioData, setAudioData] = (0, react_2.useState)(new Uint8Array(0));
    const audioRef = (0, react_2.useRef)(null);
    const analyserRef = (0, react_2.useRef)(null);
    const audioContextRef = (0, react_2.useRef)(null);
    const [bassIntensity, setBassIntensity] = (0, react_2.useState)(0);
    (0, react_2.useEffect)(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio("./media/sounds/check1.mp3");
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
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
        const updateAudioData = () => {
            if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);
                const bassRange = dataArray.slice(0, 2);
                const intensity = bassRange.reduce((sum, value) => sum + value, 0);
                if (intensity > 509) {
                    setBass(true);
                }
                else {
                    setBass(false);
                }
            }
            requestAnimationFrame(updateAudioData);
        };
        updateAudioData();
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [volume, isPlaying]);
    const handleKeyDown = (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            handlePlayClick();
        }
    };
    function handlePlayClick() {
        var _a, _b;
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.currentTime = 15;
            }
            (_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.play();
        }
        else {
            (_b = audioRef.current) === null || _b === void 0 ? void 0 : _b.pause();
        }
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement(framer_motion_1.motion.h1, null, "Musializer"),
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.button, { className: "playButton", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, onMouseDown: handlePlayClick, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.8, stiffness: 50 } },
                react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: '50px' } }, isPlaying ? "play_arrow" : "pause")),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', paddingLeft: '50px' } },
                react_1.default.createElement(Slider_1.Slider, { value: volume, set: setVolume }, "Volume"),
                react_1.default.createElement(Slider_1.Slider, { value: bassIntensity, set: setBassIntensity }, "Intensity"),
                react_1.default.createElement(Slider_1.Slider, { value: test, set: setTest }, "Test"))),
        react_1.default.createElement("div", { style: { margin: '21.44px' } }),
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
            react_1.default.createElement("div", { className: "visualizer" }, Array.from(audioData).slice(0, 64).map((value, index) => {
                const bassValue = index < audioData.length / 4 ? value : value;
                return (react_1.default.createElement(framer_motion_1.motion.div, { key: index, className: "bar", initial: { height: 0 }, animate: { height: bassValue }, transition: { duration: 0.05 } }));
            })))));
}
