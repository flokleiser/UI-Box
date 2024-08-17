"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Musializer;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(true);
    const songTest = new Audio("./media/sounds/check1.mp3");
    function handlePlayClick() {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            songTest.play();
            console.log('playing');
        }
        else if (!isPlaying) {
            songTest.pause();
            console.log('paused');
        }
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("h1", null, "Musializer"),
        react_1.default.createElement("div", { style: { display: "flex", justifyContent: 'center' } },
            react_1.default.createElement("button", { className: "playButton", style: { display: 'flex', justifyContent: 'center' }, onMouseDown: handlePlayClick },
                react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: '85px' } }, isPlaying ? "pause" : "play_arrow")))));
}
