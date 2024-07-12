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
const framer_motion_1 = require("framer-motion");
function Cube() {
    const [isInside, setIsInside] = (0, react_1.useState)(false);
    const springConfig = {
        // damping: 2,
        stiffness: 150
    };
    const x = (0, framer_motion_1.useSpring)(200, springConfig);
    const y = (0, framer_motion_1.useSpring)(200, springConfig);
    const rotateX = (0, framer_motion_1.useTransform)(y, [0, 400], [45, -45]);
    const rotateY = (0, framer_motion_1.useTransform)(x, [0, 400], [-45, 45]);
    //spinning experiments
    const [isSpinning, setIsSpinning] = (0, react_1.useState)(false);
    const spinVelocityX = (0, framer_motion_1.useMotionValue)(0);
    const spinVelocityY = (0, framer_motion_1.useMotionValue)(0);
    const handleSpin = (e) => {
        setIsSpinning(true);
        // const startX = e.clientX
        // const startY = e.clientY
    };
    const handleMouseMove = (e) => {
        if (isSpinning) {
            const startX = e.clientX;
            const startY = e.clientY;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            spinVelocityX.set(deltaX);
            spinVelocityY.set(deltaY);
            rotateX.set(rotateX.get() + deltaY * 0.5);
            rotateY.set(rotateY.get() + deltaX * 0.5);
        }
    };
    const handleMouseUp = () => {
        // rotateX.animate({
        (0, framer_motion_1.animate)(rotateX, rotateX.get(), {
            type: "inertia",
            velocity: spinVelocityY.get() * 0.5,
            power: 0.2,
            timeConstant: 700,
            onComplete: () => setIsSpinning(false)
        });
        // rotateY.animate({
        (0, framer_motion_1.animate)(rotateY, rotateY.get(), {
            type: "inertia",
            velocity: -spinVelocityX.get() * 0.5,
            power: 0.2,
            timeConstant: 700,
            onComplete: () => setIsSpinning(false)
        });
    };
    const handleMouse = (e) => {
        const rect = document.getElementById("cubeContainer").getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            setIsInside(true);
            x.set(mouseX);
            y.set(mouseY);
        }
        else {
            setIsInside(false);
        }
    };
    function handleMouseLeave(e) {
        if (!isSpinning) {
            setIsInside(false);
            x.set(200);
            y.set(200);
        }
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Cube"),
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement(framer_motion_1.motion.div, { className: "cubeContainer", id: "cubeContainer", style: {
                        // width: 500,
                        width: 400,
                        height: 400,
                        display: "flex",
                        placeItems: "center",
                        placeContent: "center",
                        borderRadius: 30,
                        // backgroundColor: "rgba(255, 255, 255, 0.05)",
                        perspective: 400
                    }, 
                    // onMouseDown={handleSpin}
                    onMouseMove: handleMouse, onMouseLeave: handleMouseLeave },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'cube', style: {
                            rotateX,
                            rotateY
                            // rotateX: isSpinning ? rotateX : useTransform(y, [0, 400], [45, -45]),
                            // rotateY: isSpinning ? rotateY : useTransform(x, [0, 400], [-45, 45])
                        } }))))));
}
