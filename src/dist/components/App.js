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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = __importStar(require("react"));
const Home_1 = __importDefault(require("../pages/Home"));
const Settings_1 = __importDefault(require("../pages/Settings"));
const Buttons_1 = __importDefault(require("../pages/Buttons"));
const Spinner_1 = __importDefault(require("../pages/Spinner"));
const Particles_1 = __importDefault(require("../pages/Particles"));
const Tether_1 = __importDefault(require("../pages/Tether"));
const Switches_1 = __importDefault(require("../pages/Switches"));
const Ball_1 = __importDefault(require("../pages/Ball"));
const Joystick_1 = __importDefault(require("../pages/Joystick"));
const Cube_1 = __importDefault(require("../pages/Cube"));
const Test_1 = __importDefault(require("../pages/Test"));
const Musializer_1 = __importDefault(require("../pages/Musializer"));
const Window_1 = require("./Window");
function App() {
    const [page, setPage] = (0, react_1.useState)(Window_1.startPage);
    const [active, setActive] = (0, react_1.useState)(page);
    let CurrentPage;
    switch (page) {
        case 'Home':
            CurrentPage = Home_1.default;
            break;
        case 'Settings':
            CurrentPage = Settings_1.default;
            break;
        case 'Buttons':
            CurrentPage = Buttons_1.default;
            break;
        case 'Spinner':
            CurrentPage = Spinner_1.default;
            break;
        case 'Particles':
            CurrentPage = Particles_1.default;
            break;
        case 'Tether':
            CurrentPage = Tether_1.default;
            break;
        case 'Switches':
            CurrentPage = Switches_1.default;
            break;
        case 'Ball':
            CurrentPage = Ball_1.default;
            break;
        case 'Joystick':
            CurrentPage = Joystick_1.default;
            break;
        case 'Test':
            CurrentPage = Test_1.default;
            break;
        case 'Cube':
            CurrentPage = Cube_1.default;
            break;
        case 'Musializer':
            CurrentPage = Musializer_1.default;
            break;
        default:
            CurrentPage = Home_1.default;
    }
    const loadPage = (newPage) => {
        setPage(newPage);
        setActive(newPage);
    };
    window.loadPage = (page) => {
        setPage(page);
        setActive(page);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CurrentPage, { loadPage: loadPage })));
}
;
