"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const audiomotion_analyzer_1 = __importDefault(require("audiomotion-analyzer"));
const check1_mp3_1 = __importDefault(require("../media/sounds/check1.mp3"));
function Test() {
    const containerRef = (0, react_2.useRef)(null);
    const audioRef = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(() => {
        if (containerRef.current) {
            const audioMotion = new audiomotion_analyzer_1.default(containerRef.current, {
                source: audioRef.current || undefined
            });
            if (audioRef.current) {
                audioRef.current.src = check1_mp3_1.default;
                audioRef.current.play();
            }
            return () => {
                audioMotion.destroy();
            };
        }
    });
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("h1", null, "Test"),
        react_1.default.createElement("div", { id: "testContainer", style: { width: 100, height: 100 } })));
}
// import AudioMotionAnalyzer from 'audiomotion-analyzer'; 
// const container = document.getElementById('container');
// // audio source
// const audioEl = document.getElementById('audio');
// // instantiate analyzer
// const audioMotion = new AudioMotionAnalyzer( null, {
//   source: audioEl,
//   mode: 2,
//   useCanvas: false, // don't use the canvas
//   onCanvasDraw: instance => {
//     const maxHeight = container.clientHeight;
//     let html = '';
//     // get analyzer bars data
//     for ( const bar of instance.getBars() ) {
//       const value    = bar.value[0],
//             peak     = bar.peak[0],
//             hold     = bar.hold[0],
//             isPeakUp = hold > 0 && peak > 0; // if hold < 0 the peak is falling down
//       // build our visualization using only DIVs
//       html += `<div class="bar" style="height: ${ value * 100 }%; background: rgba( 255, 255, 255, ${ value } )">
// 								<div class="peak" style="bottom: ${ ( peak - value ) * -maxHeight }px; ${ isPeakUp ? 'box-shadow: 0 0 10px 1px #f00' : 'opacity: ' + ( peak > 0 ? .7 : 0 ) }"></div>
// 							 </div>`;
//     }
//     container.innerHTML = html;
//     document.getElementById('fps').innerText = instance.fps.toFixed(1);
//   }
// });
// // visualization mode selection
// const elMode = document.getElementById('mode');
// elMode.value = audioMotion.mode;
// elMode.addEventListener( 'change', () => audioMotion.mode = elMode.value );
// // display module version
// document.getElementById('version').innerText = `v${AudioMotionAnalyzer.version}`;
// // play stream
// document.getElementById('live').addEventListener( 'click', () => {
//   audioEl.src = 'https://icecast2.ufpel.edu.br/live';
//   audioEl.play();
// });
// // file upload
// document.getElementById('upload').addEventListener( 'change', e => {
// 	const fileBlob = e.target.files[0];
// 	if ( fileBlob ) {
// 		audioEl.src = URL.createObjectURL( fileBlob );
// 		audioEl.play();
// 	}
// });
