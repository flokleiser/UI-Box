"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles.css");
const react_1 = require("react");
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
const react_router_dom_1 = require("react-router-dom");
function Content() {
    const [page, setPage] = (0, react_1.useState)(Window_1.startPage);
    const [active, setActive] = (0, react_1.useState)(page);
    const [activePage, setActivePage] = (0, react_1.useState)(Window_1.startPage);
    (0, react_1.useEffect)(() => {
        const handlePageChange = (event) => {
            setActivePage(event.detail.page);
        };
        window.addEventListener('pageChange', handlePageChange);
        return () => {
            window.removeEventListener('pageChange', handlePageChange);
        };
    }, []);
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
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CurrentPage, { loadPage: loadPage }) }));
}
;
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.MemoryRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Content, {}) }) }) }));
}
//# sourceMappingURL=App.js.map