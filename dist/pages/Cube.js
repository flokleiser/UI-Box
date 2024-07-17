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
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [dragStart, setDragStart] = (0, react_1.useState)('');
    const [dragEnd, setDragEnd] = (0, react_1.useState)('');
    const springConfig = {
        stiffness: 150
    };
    const x = (0, framer_motion_1.useSpring)(200, springConfig);
    const y = (0, framer_motion_1.useSpring)(200, springConfig);
    const rotateX = (0, framer_motion_1.useTransform)(y, [0, 400], [45, -45]);
    const rotateY = (0, framer_motion_1.useTransform)(x, [0, 400], [-45, 45]);
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
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart(e.currentTarget.id);
    };
    function gridClick(event) {
        console.log(event.currentTarget.id);
        // const [rotation, setRotation] = useState<Page>(startPage);
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Cube"),
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement(framer_motion_1.motion.div, { className: "cubeContainer", id: "cubeContainer", style: {
                        width: 400,
                        height: 400,
                        display: "grid",
                        placeItems: "center",
                        placeContent: "center",
                        borderRadius: 30,
                        perspective: 400,
                        position: 'relative'
                    }, onMouseDown: handleMouseDown, onMouseMove: handleMouse, onMouseLeave: handleMouseLeave },
                    react_1.default.createElement("div", { className: "section", "data-section": "0", id: "top-left", onMouseDown: gridClick }),
                    react_1.default.createElement("div", { className: "section", "data-section": "1", id: "top-center", onMouseDown: gridClick }),
                    react_1.default.createElement("div", { className: "section", "data-section": "2", id: "top-right", onMouseDown: gridClick }),
                    react_1.default.createElement("div", { className: "section", "data-section": "3", id: "center-left", onMouseDown: gridClick }),
                    react_1.default.createElement("div", { className: "section", "data-section": "4", id: "center-center", onMouseDown: gridClick }),
                    react_1.default.createElement("div", { className: "section", "data-section": "5", id: "center-right", onMouseDown: gridClick }),
                    react_1.default.createElement("div", { className: "section", "data-section": "6", id: "bottom-left", onMouseDown: gridClick }),
                    react_1.default.createElement("div", { className: "section", "data-section": "7", id: "bottom-center", onMouseDown: gridClick }),
                    react_1.default.createElement("div", { className: "section", "data-section": "8", id: "bottom-right", onMouseDown: gridClick }),
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'cube', style: {
                            rotateX,
                            rotateY,
                            position: 'absolute',
                            transform: "translate(-50%,-50%)"
                        }, whileTap: { scale: 0.8 } }))))));
}
