"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
function Settings() {
    const [activeThemeSource, setThemeSource] = (0, react_2.useState)('system');
    (0, react_2.useEffect)(() => {
        function fetchThemeSource() {
            return __awaiter(this, void 0, void 0, function* () {
                const currentThemeSource = yield window.darkMode.getThemeSource();
                setThemeSource(currentThemeSource);
            });
        }
        fetchThemeSource();
    }, []);
    function toggleDarkMode() {
        window.darkMode.toggle().then(() => {
            window.darkMode.getThemeSource().then(setThemeSource);
        });
    }
    function toggleSystemMode() {
        window.darkMode.system();
        window.darkMode.getThemeSource().then(setThemeSource);
    }
    function themeSourceDisplay() {
        if (activeThemeSource === 'dark') {
            return 'Dark';
        }
        else if (activeThemeSource === 'light') {
            return 'Light';
        }
        else {
            return 'System';
        }
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Settings"),
            react_1.default.createElement("p", null,
                "Current:",
                react_1.default.createElement("strong", { id: "theme-source" }, themeSourceDisplay())),
            react_1.default.createElement("button", { className: "buttonInSettings", id: "toggle-dark-mode", onMouseDown: toggleDarkMode }, "Toggle Dark Mode"),
            react_1.default.createElement("button", { className: "buttonInSettings", id: "reset-to-system", onMouseDown: toggleSystemMode }, "Reset to System Theme"))));
}
