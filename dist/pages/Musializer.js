"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = Slider;
exports.default = Musializer;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const framer_motion_1 = require("framer-motion");
function Slider({ value, set, min = 0, max = 100 }) {
    return (react_1.default.createElement("div", { className: "volumeSliderDiv" },
        react_1.default.createElement("input", { className: "volumeSlider", value: value, type: "range", min: min, max: max, onChange: (e) => set(parseFloat(e.target.value)) })));
}
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(true);
    const [volume, setVolume] = (0, react_2.useState)(50);
    // const [audioData, setAudioData] = useState(new Uint8Array(0));
    const [audioData, setAudioData] = (0, react_2.useState)(new Uint8Array(0));
    const audioRef = (0, react_2.useRef)(null);
    const analyserRef = (0, react_2.useRef)(null);
    const audioContextRef = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio("./media/sounds/check1.mp3");
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContextRef.current.createMediaElementSource(audioRef.current);
            analyserRef.current = audioContextRef.current.createAnalyser();
            // analyserRef.current.maxDecibels = 25
            // analyserRef.current.minDecibels= 2
            source.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
            analyserRef.current.fftSize = 256;
            // analyserRef.current.fftSize = 32;
            const bufferLength = analyserRef.current.frequencyBinCount;
            setAudioData(new Uint8Array(bufferLength));
        }
    }, []);
    (0, react_2.useEffect)(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);
    (0, react_2.useEffect)(() => {
        const updateAudioData = () => {
            if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);
            }
            requestAnimationFrame(updateAudioData);
        };
        updateAudioData();
    }, []);
    function handlePlayClick() {
        var _a, _b;
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            (_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.play();
            console.log('playing');
        }
        else if (!isPlaying) {
            (_b = audioRef.current) === null || _b === void 0 ? void 0 : _b.pause();
            console.log('paused');
        }
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("h1", null, "Musializer"),
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: 'row', justifyContent: 'center' } },
            react_1.default.createElement("button", { className: "playButton", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, onMouseDown: handlePlayClick },
                react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: '85px' } }, isPlaying ? "play_arrow" : "pause")),
            react_1.default.createElement("div", { className: "volumeSliderDiv" },
                react_1.default.createElement("div", { className: "volumeSlider" },
                    react_1.default.createElement(Slider, { value: volume, set: setVolume })))),
        react_1.default.createElement("div", { className: "visualizer" }, Array.from(audioData).map((value, index) => (
        // {/* {Array.from(audioData.slice(0, 20)).map((value, index) => ( */}
        react_1.default.createElement(framer_motion_1.motion.div, { key: index, className: "bar", initial: { height: 0 }, animate: { height: value }, 
            // animate={{ height: value*0.5 }}
            transition: { duration: 0.05 } }))))));
}
