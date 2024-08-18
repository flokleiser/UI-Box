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
// const AudioVisualiser: React.FC<{ audioData: Uint8Array }> = ({ audioData }) => {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     useEffect(() => {
//       const draw = () => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const height = canvas.height;
//         const width = canvas.width;
//         const context = canvas.getContext('2d');
//         if (!context) return;
//         let x = 0;
//         const sliceWidth = (width * 1.0) / audioData.length;
//         context.lineWidth = 2;
//         context.strokeStyle = '#000000';
//         context.clearRect(0, 0, width, height);
//         context.beginPath();
//         context.moveTo(0, height / 2);
//         for (const item of audioData) {
//           const y = (item / 255.0) * height;
//           context.lineTo(x, y);
//           x += sliceWidth;
//         }
//         context.lineTo(x, height / 2);
//         context.stroke();
//       };
//       draw();
//     }, [audioData]);
//     return <canvas width="600" height="300" ref={canvasRef} />;
//   };
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(true);
    const [volume, setVolume] = (0, react_2.useState)(50);
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
            // analyserRef.current.fftSize = 256; 
            // analyserRef.current.fftSize = 128;
            analyserRef.current.fftSize = 64;
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
                const bassRange = dataArray.slice(0, dataArray.length / 4);
                const intensity = bassRange.reduce((sum, value) => sum + value, 0);
                setBassIntensity(intensity);
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
        }
        else if (!isPlaying) {
            (_b = audioRef.current) === null || _b === void 0 ? void 0 : _b.pause();
        }
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("h1", null, "Musializer"),
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: 'row', justifyContent: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.button, { className: "playButton", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, onMouseDown: handlePlayClick, animate: {
                    scale: 1 + bassIntensity / 50000,
                }, transition: { duration: 0.1 } },
                react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: '85px' } }, isPlaying ? "play_arrow" : "pause")),
            react_1.default.createElement(Slider_1.Slider, { value: volume, set: setVolume })),
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
            react_1.default.createElement("div", { className: "visualizer" }, Array.from(audioData).reverse().map((value, index) => (react_1.default.createElement(framer_motion_1.motion.div, { key: index, className: "bar", initial: { height: 0 }, animate: { height: value }, transition: { duration: 0.05 } })))),
            react_1.default.createElement("div", { className: "visualizer" }, Array.from(audioData).map((value, index) => (react_1.default.createElement(framer_motion_1.motion.div, { key: index, className: "bar", initial: { height: 0 }, animate: { height: value }, transition: { duration: 0.05 } })))))));
}
