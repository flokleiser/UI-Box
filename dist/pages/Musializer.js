"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Musializer;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(false);
    function handlePlayClick() {
        setIsPlaying(!isPlaying);
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("h1", null, "Musializer"),
        react_1.default.createElement("button", { className: "playButton", style: { backgroundColor: 'rgba(0,0,0,0)' }, onMouseDown: handlePlayClick },
            react_1.default.createElement("span", { className: "material-symbols-outlined" }, isPlaying ? "pause" : "play_arrow"))));
}
