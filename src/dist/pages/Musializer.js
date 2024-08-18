"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Musializer;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const Slider_1 = require("../components/Slider");
const wavesurfer_js_1 = __importDefault(require("wavesurfer.js"));
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(true);
    const [volume, setVolume] = (0, react_2.useState)(50);
    const [audioData, setAudioData] = (0, react_2.useState)(new Uint8Array(0));
    const audioRef = (0, react_2.useRef)(null);
    const analyserRef = (0, react_2.useRef)(null);
    const audioContextRef = (0, react_2.useRef)(null);
    const waveSurverContainer = document.getElementById("wavesurfer");
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
    const wavesurfer = wavesurfer_js_1.default.create({
        // document: document.getElementById("wavesurfer"),
        container: document.body,
        // container: '#wavesurfer',
        waveColor: 'rgb(200,0,200)',
        progressColor: 'rgb(100,0,100)',
        url: './media/sounds/check1.mp3'
    });
    wavesurfer.on('click', () => {
        wavesurfer.play();
    });
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("h1", null, "Musializer"),
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: 'row', justifyContent: 'center' } },
            react_1.default.createElement("button", { className: "playButton", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, onMouseDown: handlePlayClick },
                react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: '85px' } }, isPlaying ? "play_arrow" : "pause")),
            react_1.default.createElement("div", { className: "volumeSliderDiv" },
                react_1.default.createElement("div", { className: "volumeSlider" },
                    react_1.default.createElement(Slider_1.Slider, { value: volume, set: setVolume })))),
        react_1.default.createElement("div", { id: "wavesurfer" })));
}
