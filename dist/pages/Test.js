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
    const [currentSong, setCurrentSong] = (0, react_1.useState)(Music_1.music[0]);
    const [audioMotion, setAudioMotion] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
        }
    }, [currentSong]);
    (0, react_1.useEffect)(() => {
        if (audioRef.current && canvasRef.current && !audioMotion) {
            console.log('init');
            const analyzer = new audiomotion_analyzer_1.default(canvasRef.current, {
                source: audioRef.current,
                mode: 4,
                //   mode: 3,
                //   radial:true
                roundBars: true,
                lumiBars: true,
                showScaleX: false,
                // loRes: true,
            });
            setAudioMotion(analyzer);
        }
    }, [audioRef.current, canvasRef.current, audioMotion]);
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.h1, null, "Test")),
        react_1.default.createElement("audio", { ref: audioRef, controls: true },
            react_1.default.createElement("source", { src: currentSong.file, type: "audio/mpeg" })),
        react_1.default.createElement("div", { style: { padding: "5px" } }),
        react_1.default.createElement("div", { id: "canvasDiv", className: "canvasDiv", ref: canvasRef })));
}
