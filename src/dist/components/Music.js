"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.music = void 0;
const check1_mp3_1 = __importDefault(require("../media/sounds/check1.mp3"));
const didITellYou_mp3_1 = __importDefault(require("../media/sounds/didITellYou.mp3"));
const psyche_mp3_1 = __importDefault(require("../media/sounds/psyche.mp3"));
const ugh_mp3_1 = __importDefault(require("../media/sounds/ugh.mp3"));
const music = [
    {
        name: "check1",
        artist: "Umru",
        file: check1_mp3_1.default
    },
    {
        name: "did I Tell You",
        artist: "Kettema",
        file: didITellYou_mp3_1.default
    },
    {
        name: "psyche",
        artist: "Babii",
        file: psyche_mp3_1.default
    },
    {
        name: "Ugh",
        artist: "Sh?m",
        file: ugh_mp3_1.default
    }
];
exports.music = music;
