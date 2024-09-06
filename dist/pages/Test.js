"use strict";
// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
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
// export default function Test() {
//     return (
//         <div className="bodyCenter">
//             <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
//                 <h1>Test</h1>
//             </div>
//             <div className="music-progress">
//                 <div className="progress-bar">
//                     <span className="progress-line"></span>
//                     <input type='range' min='0' max='100' value='0' className="progress" id="progress"/>
//                 </div>
//                 <div className="duration">
//                     <span className="current-time">00:00</span>
//                     <span className="duration-time">00:00</span>
//                 </div>
//             </div>
//         </div>
//     );
// }
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const Slider_1 = require("../components/Slider");
const Music_1 = require("../components/Music");
const Overlay_1 = __importDefault(require("../components/Overlay"));
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    const [volume, setVolume] = (0, react_1.useState)(50);
    const [bass, setBass] = (0, react_1.useState)(false);
    const [audioData, setAudioData] = (0, react_1.useState)(new Uint8Array(0));
    const audioRef = (0, react_1.useRef)(null);
    const analyserRef = (0, react_1.useRef)(null);
    const audioContextRef = (0, react_1.useRef)(null);
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const [isOverlayVisible, setOverlayVisible] = (0, react_1.useState)(false);
    const [currentSong, setCurrentSong] = (0, react_1.useState)(Music_1.music[2]);
    const radius = 85;
    const circumference = 2 * Math.PI * radius / 2;
    const initialOffset = circumference;
    const [offset, setOffset] = (0, react_1.useState)(initialOffset);
    const [progress, setProgress] = (0, react_1.useState)(0);
    let smoothedIntensity = 0;
    const buttonRef = (0, react_1.useRef)(null);
    const buttonRefSmall1 = (0, react_1.useRef)(null);
    const buttonRefSmall2 = (0, react_1.useRef)(null);
    const buttonRefSmall3 = (0, react_1.useRef)(null);
    const buttonRefSmall4 = (0, react_1.useRef)(null);
    const outlineRef = (0, react_1.useRef)(null);
    const volumeRef = (0, react_1.useRef)(null);
    const intensityRef = (0, react_1.useRef)(null);
    const [bounceRadiusIntensity, setBounceRadiusIntensity] = (0, react_1.useState)(5);
    const normalizeBounceRadiusIntensity = (value) => {
        return (value / 10) * 2; // Normalize from 0-9 to 0-2
    };
    // if (isEqualizer) {
    (0, react_1.useEffect)(() => {
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
    }, []);
    // }
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
    //song selection
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
        }
    }, [currentSong]);
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
    const handleSeek = (e) => {
        const newTime = (parseFloat(e.target.value) / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.h1, null, "Musializer"),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
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
        react_1.default.createElement("div", { className: "volumeSlider", style: { width: '100%', marginTop: '15px', color: '#ddd' } },
            react_1.default.createElement("input", { type: "range", min: "0", max: "100", 
                // value={progress}
                value: isNaN(progress) ? 0 : progress, onChange: handleSeek, style: { width: '100%' } })),
        react_1.default.createElement("div", { style: { padding: "10px" } }),
        react_1.default.createElement("div", { id: "canvasDiv", className: "canvasDiv" },
            react_1.default.createElement("div", { className: "visualizer" }, Array.from(audioData).slice(0, 64).map((value, index) => {
                return (react_1.default.createElement(framer_motion_1.motion.div, { key: index, className: "bar", initial: { height: 0 }, animate: { height: value }, transition: { duration: 0.05 } }));
            })))));
}
