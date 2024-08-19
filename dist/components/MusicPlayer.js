"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MusicPlayer;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const framer_motion_1 = require("framer-motion");
// import { Slider } from '../components/Slider'
function MusicPlayer() {
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(true);
    const [volume, setVolume] = (0, react_2.useState)(50);
    const [test, setTest] = (0, react_2.useState)(0);
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
            // analyserRef.current.fftSize = 1024; 
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
                const bassRange = dataArray.slice(0, 2);
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
    return (
    // <div className="bodyCenter">
    //         <motion.h1
    //         >
    //             Musializer
    //         </motion.h1>
    //         <div style={{display:"flex", flexDirection:'row', justifyContent:'center',alignItems: 'center'}}>                
    //             <motion.button className="playButton" style={{display:'flex', justifyContent:'center', alignItems:'center'}} onMouseDown={handlePlayClick}
    //             animate={{
    //                 scale: 1 + bassIntensity / 750, 
    //             }}
    //             transition={{ duration: 0.001 }} 
    //             >
    //                 <span className="material-symbols-outlined" style={{fontSize: '50px'}}>
    //                 {isPlaying? "play_arrow" : "pause"} 
    //                 </span>
    //             </motion.button>
    //         <div style={{display:'flex',flexDirection:'column', paddingLeft:'50px'}}>
    //             <Slider value={volume} set={setVolume}>
    //                 Volume
    //             </Slider>
    //             <Slider value={bassIntensity} set={setBassIntensity}>
    //                 Intensity
    //             </Slider>
    //             <Slider value={test} set={setTest}>
    //                Test 
    //             </Slider>
    //         </div>
    //         </div>
    react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
        react_1.default.createElement("div", { className: "visualizer" }, Array.from(audioData).slice(0, 64).map((value, index) => {
            const bassValue = index < audioData.length / 4 ? value : value; // Adjust multiplier for bass emphasis
            return (react_1.default.createElement(framer_motion_1.motion.div, { key: index, className: "bar", initial: { height: 0 }, animate: { height: bassValue }, transition: { duration: 0.05 } }));
        })))
    // </div>
    );
}
