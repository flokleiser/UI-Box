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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cube;
const react_1 = __importStar(require("react"));
// import {motion, useAnimation, useDragControls} from "framer-motion"
const framer_motion_1 = require("framer-motion");
function Cube() {
    const x = (0, framer_motion_1.useMotionValue)(200);
    const y = (0, framer_motion_1.useMotionValue)(200);
    const [isInside, setIsInside] = (0, react_1.useState)(false);
    const springConfig = {
        damping: 20,
        // stiffness: 300 
    };
    const rotateXSpring = (0, framer_motion_1.useSpring)(0, springConfig);
    const rotateYSpring = (0, framer_motion_1.useSpring)(0, springConfig);
    const rotateX = (0, framer_motion_1.useTransform)(y, [0, 400], [45, -45]);
    const rotateY = (0, framer_motion_1.useTransform)(x, [0, 400], [-45, 45]);
    function handleMouse(event) {
        const rect = document.getElementById("cubeContainer").getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            setIsInside(true);
            x.set(mouseX);
            y.set(mouseY);
        }
        else {
            setIsInside(false);
            // x.set(200);
            // y.set(200);
            // rotateXSpring.set(mouseX)
            // rotateYSpring.set(mouseY)
        }
    }
    function handleMouseLeave(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        setIsInside(false);
        x.set(mouseX);
        y.set(mouseY);
    }
    (0, react_1.useEffect)(() => {
        if (!isInside) {
            rotateXSpring.set(rotateX.get());
            rotateYSpring.set(rotateY.get());
            // rotateXSpring.set(0);
            // rotateYSpring.set(0);
            console.log('outside');
        }
    }, [isInside, rotateX, rotateY]);
    // useEffect(() => {
    //     if (isInside) {
    //         rotateXSpring.set(rotateX.get());
    //         rotateYSpring.set(rotateY.get());
    //     } else {
    //         rotateXSpring.set(0);
    //         rotateYSpring.set(0);
    //     }
    // }, [isInside, rotateX, rotateY]);
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Cube"),
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement(framer_motion_1.motion.div, { id: "cubeContainer", style: {
                        // width: 500,
                        width: 400,
                        height: 400,
                        display: "flex",
                        placeItems: "center",
                        placeContent: "center",
                        borderRadius: 30,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        perspective: 400
                    }, onMouseMove: handleMouse, onMouseLeave: handleMouseLeave },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'cube', style: {
                            // rotateX: isInside ? rotateX : 0,
                            // rotateY: isInside ? rotateY : 0,
                            rotateX: isInside ? rotateX : rotateXSpring,
                            rotateY: isInside ? rotateY : rotateYSpring,
                            // rotateX: rotateXSpring,
                            // rotateY:rotateYSpring,
                        } }))))));
}
