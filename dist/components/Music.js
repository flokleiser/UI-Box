"use strict";
// import check1 from "../media/sounds/check1.mp3";
// import didITellYou from "../media/sounds/didITellYou.mp3";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check1Sound = void 0;
// interface Audio {
//     name: string;
//     artist: string; 
//     file: string;
// }
// const music: Audio[] = [
//     {
//         name: "check1",
//         artist: "Umru",
//         file: check1
//     },
//     {
//         name: "didITellYou",
//         artist: "Kettema",
//         file: didITellYou
//     }
// ]
// export {music}
const check1_mp3_1 = __importDefault(require("../media/sounds/check1.mp3"));
const check1Sound = {
    name: "check1",
    artist: "Umru",
    file: check1_mp3_1.default
};
exports.check1Sound = check1Sound;
