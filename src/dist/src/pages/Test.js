"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Musializer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const Slider_1 = require("../components/Slider");
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    const [volume, setVolume] = (0, react_1.useState)(50);
    const [test, setTest] = (0, react_1.useState)(0);
    const [bass, setBass] = (0, react_1.useState)(false);
    const [audioData, setAudioData] = (0, react_1.useState)(new Uint8Array(0));
    const audioRef = (0, react_1.useRef)(null);
    const analyserRef = (0, react_1.useRef)(null);
    const audioContextRef = (0, react_1.useRef)(null);
    const [bassIntensity, setBassIntensity] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio("../../assets/media/sounds/check1.mp3");
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
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.currentTime = 15;
            }
            audioRef.current?.play();
        }
        else {
            audioRef.current?.pause();
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bodyCenter", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.h1, { children: "Musializer" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "playButton", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, onMouseDown: handlePlayClick, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.8, stiffness: 50 }, children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", style: { fontSize: '50px' }, children: isPlaying ? "play_arrow" : "pause" }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', paddingLeft: '50px' }, children: [(0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: volume, set: setVolume, children: "Volume" }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: bassIntensity, set: setBassIntensity, children: "Intensity" }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: test, set: setTest, children: "Test" })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { margin: '21.44px' } }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)("div", { className: "visualizer", children: Array.from(audioData).slice(0, 64).map((value, index) => {
                        const bassValue = index < audioData.length / 4 ? value : value;
                        return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "bar", initial: { height: 0 }, animate: { height: bassValue }, transition: { duration: 0.05 } }, index));
                    }) }) })] }));
}
//# sourceMappingURL=Test.js.map