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
const Music_1 = require("../components/Music");
const audiomotion_analyzer_1 = __importDefault(require("audiomotion-analyzer"));
function Test() {
    const canvasRef = (0, react_1.useRef)(null);
    const audioRef = (0, react_1.useRef)(null);
    const [currentSong, setCurrentSong] = (0, react_1.useState)(Music_1.music[2]);
    const [audioMotion, setAudioMotion] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
            audioRef.current.currentTime = 48;
        }
    }, [currentSong]);
    (0, react_1.useEffect)(() => {
        if (audioRef.current && canvasRef.current && !audioMotion) {
            const analyzer = new audiomotion_analyzer_1.default(canvasRef.current, {
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
                gradient: 'prism',
                colorMode: 'bar-level',
                linearAmplitude: true,
                linearBoost: 1.5
            });
            analyzer.registerGradient('test', {
                bgColor: 'rgba(1,1,1,0)',
                colorStops: [
                    'rgba(255,255,255,0.8)',
                    { color: 'white', pos: 0.6 },
                    { color: '#0f0', level: 0.5 }
                ]
            });
            setAudioMotion(analyzer);
        }
        // if (audioRef.current && canvasRef.current && !audioMotion) {
        //     console.log('init')
        //     const analyzer = new AudioMotionAnalyzer(canvasRef.current, {
        //       source: audioRef.current,
        //     //   mode:4, 
        //     //   mode: 3,
        //     //   radial:true
        //     // roundBars: true,
        //     // lumiBars: true,
        //     showScaleX: false,
        //     showPeaks:false,
        //     showBgColor: false,
        //     overlay: true,
        //     gradient: 'test',
        //     // gradient: 'classic'
        //     analyzer.registerGradient( 'test', {
        //         bgColor: 'rgba(1,1,1,0)', // background color (optional) - defaults to '#111'
        //         colorStops: [       // list your gradient colors in this array (at least one color is required)
        //             'rgba(255,255,255,0.8)',        // colors can be defined in any valid CSS format
        //             { color: 'white', pos: .6 }, // in an object, use `pos` to adjust the offset (0 to 1) of a colorStop
        //             { color: '#0f0', level: .5 }  // use `level` to set the max bar amplitude (0 to 1) to use this color
        //         ]
        //     });
        // });
        // setAudioMotion(analyzer);
        //   }
    }, [audioRef.current, canvasRef.current, audioMotion]);
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.h1, null, "Test")),
        react_1.default.createElement("audio", { ref: audioRef, controls: true, style: { width: "100%" } },
            react_1.default.createElement("source", { src: currentSong.file, type: "audio/mpeg" })),
        react_1.default.createElement("div", { style: { padding: "5px" } }),
        react_1.default.createElement("div", { id: "canvasDiv", className: "canvasDiv", ref: canvasRef })));
}
