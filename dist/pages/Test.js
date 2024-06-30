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
exports.default = Test;
const react_1 = __importStar(require("react"));
function Test() {
    const [isActive, setIsActive] = (0, react_1.useState)([false, false, false]);
    const handleActive = (index) => {
        const updateActive = isActive.map((state, i) => i === index ? !state : state);
        setIsActive(updateActive);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Test"),
        react_1.default.createElement("div", { className: "tabs" },
            react_1.default.createElement("div", { className: `${isActive[0] ? 'tab active' : 'tab'}`, onMouseDown: () => handleActive(0) },
                react_1.default.createElement("div", { className: "tab-box" })),
            react_1.default.createElement("div", { className: `${isActive[1] ? 'tab active' : 'tab'}`, onMouseDown: () => handleActive(1) },
                react_1.default.createElement("div", { className: "tab-box" })),
            react_1.default.createElement("div", { className: `${isActive[2] ? 'tab active' : 'tab'}`, onMouseDown: () => handleActive(2) },
                react_1.default.createElement("div", { className: "tab-box" }))),
        react_1.default.createElement("div", { className: "content" })));
}
{ /* <div className="surface">
<div className="mock-browser">
<div className="chrome-tabs"
style={{margin: '9px'}}
>
<div className="chrome-tabs-content">
<div className="chrome-tab">
  <div className="chrome-tab-dividers"></div>
  <div className="chrome-tab-background">
  </div>
  <div className="chrome-tab-content">
    <div className="chrome-tab-favicon" ></div>
    <div className="chrome-tab-title">Google</div>
    <div className="chrome-tab-drag-handle"></div>
    <div className="chrome-tab-close"></div>
  </div>
</div>
<div className="chrome-tab"
// active
>
  <div className="chrome-tab-dividers"></div>
  <div className="chrome-tab-background">
  </div>
  <div className="chrome-tab-content">
    <div className="chrome-tab-favicon" ></div>
    <div className="chrome-tab-title">Facebook</div>
    <div className="chrome-tab-drag-handle"></div>
    <div className="chrome-tab-close"></div>
  </div>
</div>
</div>
<div className="chrome-tabs-bottom-bar"></div>

</div>
</div>
</div> */
}
