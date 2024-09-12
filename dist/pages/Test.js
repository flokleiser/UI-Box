"use strict";
// // import React, { useState, useEffect, useRef } from "react";
// // import { motion, useMotionValue, useTransform } from "framer-motion";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;
// export default function Test() {
//     const x = useMotionValue(0)
//     const y = useMotionValue(0)
//     const rotateX = useTransform(y, [-100, 100], [60, -60])
//     const rotateY = useTransform(x, [-100, 100], [-60, 60])
//     return (
//         <div className="bodyCenter">
//             <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
//                 <h1>Test</h1>
//             </div>
//             <div>
//             <div
//                 style={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: "50%",
//                     background: `radial-gradient(rgba(255,255,255,0),
//                         rgba(255,255,255,0.3))`,
//                     perspective: 800,
//                 }}
//             >
//                 <motion.div
//                     style={{
//                         width: 150,
//                         height: 150,
//                         borderRadius: 30,
//                         backgroundColor: "#fff",
//                         left: -25,
//                         top: -25,
//                         position: "relative",
//                         x,
//                         y,
//                         rotateX,
//                         rotateY,
//                         cursor: "grab",
//                     }}
//                     drag
//                     dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
//                     dragElastic={0.6}
//                     whileTap={{ cursor: "grabbing" }}
//                 />
//             </div>
//         </div>
//         </div>
//     );
// }
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
function Test() {
    const x = (0, framer_motion_1.useMotionValue)(0);
    const y = (0, framer_motion_1.useMotionValue)(0);
    const rotateX = (0, framer_motion_1.useTransform)(y, [-100, 100], [60, -60]);
    const rotateY = (0, framer_motion_1.useTransform)(x, [-100, 100], [-60, 60]);
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' } },
                react_1.default.createElement("h1", null, "Cube")),
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement("div", { style: { position: "absolute", opacity: 0.1, width: 400, height: 400 } }),
                react_1.default.createElement(framer_motion_1.motion.div, { className: "cubeContainer", id: "cubeContainer", style: {
                        width: 400,
                        height: 400,
                        display: "grid",
                        placeItems: "center",
                        placeContent: "center",
                        borderRadius: 30,
                        // perspective: 400,
                        perspective: '1000px',
                        position: 'relative',
                    } },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'cube', style: {
                            width: 150,
                            height: 150,
                            borderRadius: 30,
                            backgroundColor: "#fff",
                            position: "absolute",
                            x,
                            y,
                            rotateX,
                            rotateY,
                            cursor: "grab",
                        }, drag: true, dragConstraints: { top: 0, right: 0, bottom: 0, left: 0 }, dragElastic: 0.6, whileTap: { cursor: "grabbing" } }))))));
}
