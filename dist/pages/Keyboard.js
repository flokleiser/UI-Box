"use strict";
//https://github.com/bobboteck/JoyStick?tab=readme-ov-file
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
exports.default = Keyboard;
const react_1 = __importStar(require("react"));
function Keyboard() {
    const [position, setPosition] = (0, react_1.useState)({ x: 50, y: 50 });
    const [initialPosition] = (0, react_1.useState)({ x: 50, y: 50 });
    const step = 15;
    const handleKeyDown = (event) => {
        const { key } = event;
        setPosition((prevPosition) => {
            let newPosition = Object.assign({}, prevPosition);
            if (key === 'w') {
                newPosition.y = initialPosition.y - step;
            }
            else if (key === 'a') {
                newPosition.x = initialPosition.x - step;
            }
            else if (key === 's') {
                newPosition.y = initialPosition.y + step;
            }
            else if (key === 'd') {
                newPosition.x = initialPosition.x + step;
            }
            return newPosition;
        });
    };
    const handleKeyUp = (event) => {
        const { key } = event;
        if (['w', 'a', 's', 'd'].includes(key)) {
            setPosition(initialPosition);
        }
    };
    (0, react_1.useEffect)(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Keyboard"),
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                width: '100px',
                height: '100px',
                backgroundColor: 'white',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'left 0.1s, top 0.1s',
                left: `${position.x}%`,
                top: `${position.y}%`,
            } })));
}
