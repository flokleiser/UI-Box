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
    const [isSwitched, setIsSwitched] = (0, react_1.useState)(false);
    const [isSpinning, setIsSpinning] = (0, react_1.useState)(false);
    const springConfig = {
        stiffness: 150
    };
    const x = (0, framer_motion_1.useSpring)(200, springConfig);
    const y = (0, framer_motion_1.useSpring)(200, springConfig);
    const rotateX = (0, framer_motion_1.useTransform)(y, [0, 400], [45, -45]);
    const rotateY = (0, framer_motion_1.useTransform)(x, [0, 400], [-45, 45]);
    //spinning experiments
    const spinVelocityX = (0, framer_motion_1.useMotionValue)(0);
    const spinVelocityY = (0, framer_motion_1.useMotionValue)(0);
    const handleMouseDown = (e) => {
        if (isSwitched) {
            setIsSpinning(true);
            const startX = e.clientX;
            const startY = e.clientY;
            const handleMouseMove = (moveEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaY = moveEvent.clientY - startY;
                spinVelocityX.set(deltaX);
                spinVelocityY.set(deltaY);
                rotateX.set(rotateX.get() + deltaY * 0.5);
                rotateY.set(rotateY.get() + deltaX * 0.5);
            };
            const handleMouseUp = () => {
                setIsSpinning(false);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                (0, framer_motion_1.animate)(rotateX, rotateX.get(), {
                    type: "inertia",
                    velocity: spinVelocityY.get() * 0.01,
                    power: 0.01,
                    timeConstant: 700,
                    onComplete: () => setIsSpinning(false)
                });
                (0, framer_motion_1.animate)(rotateY, rotateY.get(), {
                    type: "inertia",
                    velocity: -spinVelocityX.get() * 0.01,
                    power: 0.01,
                    timeConstant: 700,
                    onComplete: () => setIsSpinning(false)
                });
                // animate(rotateX, {
                //     type: "inertia",
                //     velocity: spinVelocityY.get() * 0.5,
                //     power: 0.5,
                //     timeConstant: 700,
                // });
                // animate(rotateY, {
                //     type: "inertia",
                //     velocity: -spinVelocityX.get() * 0.5,
                //     power: 0.5,
                //     timeConstant: 700,
                // });
            };
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
    };
    const handleMouse = (e) => {
        const rect = document.getElementById("cubeContainer").getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        if (!isSwitched) {
            if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
                setIsInside(true);
                x.set(mouseX);
                y.set(mouseY);
            }
            else {
                setIsInside(false);
            }
        }
    };
    function handleMouseLeave(e) {
        setIsInside(false);
        x.set(200);
        y.set(200);
    }
    function handleCubeSwitch() {
        setIsSwitched(!isSwitched);
        console.log('test');
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' } },
                react_1.default.createElement("h1", null, "Cube"),
                react_1.default.createElement(framer_motion_1.motion.button, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)' }, onMouseDown: handleCubeSwitch },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, isSwitched ? "hand_gesture" : "do_not_touch"))),
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
                    onMouseDown: handleMouseDown, onMouseMove: handleMouse, onMouseLeave: handleMouseLeave },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'cube', style: {
                            rotateX,
                            rotateY
                            // rotateX: isSpinning ? rotateX : useTransform(y, [0, 400], [45, -45]),
                            // rotateY: isSpinning ? rotateY : useTransform(x, [0, 400], [-45, 45])
                        } }))))));
}
