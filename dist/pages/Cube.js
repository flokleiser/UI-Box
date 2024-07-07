"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cube;
const react_1 = __importDefault(require("react"));
// import {motion, useAnimation, useDragControls} from "framer-motion"
const framer_motion_1 = require("framer-motion");
function Cube() {
    const x = (0, framer_motion_1.useMotionValue)(300);
    const y = (0, framer_motion_1.useMotionValue)(200);
    const rotateX = (0, framer_motion_1.useTransform)(y, [0, 400], [45, -45]);
    const rotateY = (0, framer_motion_1.useTransform)(x, [0, 500], [-45, 45]);
    function handleMouse(event) {
        const rect = document.getElementById("cubeContainer").getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Cube"),
            react_1.default.createElement("div", { style: { display: 'flex ' } },
                react_1.default.createElement(framer_motion_1.motion.div, { id: "cubeContainer", style: {
                        width: 600,
                        height: 400,
                        display: "flex",
                        placeItems: "center",
                        placeContent: "center",
                        borderRadius: 30,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        perspective: 400
                    }, onMouseMove: handleMouse },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'cube', style: {
                            rotateX,
                            rotateY
                        } }))))));
}
