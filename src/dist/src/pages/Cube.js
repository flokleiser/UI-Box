"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cube;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
function Cube() {
    const [isInside, setIsInside] = (0, react_1.useState)(false);
    const [isSwitched, setIsSwitched] = (0, react_1.useState)(false);
    // const springConfig = { stiffness: 150 };
    const springConfig = { stiffness: 150, damping: 25 };
    const x = (0, framer_motion_1.useSpring)(200, springConfig);
    const y = (0, framer_motion_1.useSpring)(200, springConfig);
    const rotateX = (0, framer_motion_1.useMotionValue)(0);
    const rotateY = (0, framer_motion_1.useMotionValue)(0);
    const tiltX = (0, framer_motion_1.useTransform)(y, [0, 400], [45, -45]);
    const tiltY = (0, framer_motion_1.useTransform)(x, [0, 400], [-45, 45]);
    const compositeRotateX = (0, framer_motion_1.useTransform)(() => rotateX.get() + tiltX.get());
    const compositeRotateY = (0, framer_motion_1.useTransform)(() => rotateY.get() + tiltY.get());
    function handleSwitchClick() {
        setIsSwitched(!isSwitched);
    }
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
    function handleMouseLeave() {
        setIsInside(false);
        x.set(200);
        y.set(200);
    }
    function animateRotation(newRotateX, newRotateY) {
        return new Promise((resolve) => {
            Promise.all([
                (0, framer_motion_1.animate)(rotateY, newRotateY, { duration: 0.5 }),
                (0, framer_motion_1.animate)(rotateX, newRotateX, { duration: 0.5 })
            ]).then(() => resolve());
        });
    }
    async function gridClick(event) {
        if (!isSwitched) {
            const id = event.currentTarget.id;
            let newRotateX = rotateX.get();
            let newRotateY = rotateY.get();
            switch (id) {
                case "top-center":
                    newRotateX += 180;
                    break;
                case "bottom-center":
                    newRotateX -= 180;
                    break;
                case "center-left":
                    newRotateY -= 180;
                    break;
                case "center-right":
                    newRotateY += 180;
                    break;
                case "top-left":
                    newRotateX += 180;
                    newRotateY -= 135;
                    break;
                case "top-right":
                    newRotateX += 180;
                    newRotateY += 135;
                    break;
                case "bottom-left":
                    newRotateX -= 180;
                    newRotateY -= 135;
                    break;
                case "bottom-right":
                    newRotateX -= 180;
                    newRotateY += 135;
                    break;
            }
            await animateRotation(newRotateX, newRotateY);
            rotateX.set(0);
            rotateY.set(0);
        }
    }
    async function handleDragEnd(event, info) {
        if (isSwitched) {
            const { offset } = info;
            let newRotateX = 0;
            let newRotateY = 0;
            if (Math.abs(offset.x) > Math.abs(offset.y)) {
                // Horizontal swipe
                if (offset.x > 0) {
                    newRotateY = 180; // Swipe right
                }
                else {
                    newRotateY = -180; // Swipe left
                }
            }
            else {
                // Vertical swipe
                if (offset.y > 0) {
                    newRotateX = -180; // Swipe down
                }
                else {
                    newRotateX = 180; // Swipe up
                }
            }
            await animateRotation(newRotateX, newRotateY);
            rotateX.set(0);
            rotateY.set(0);
        }
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "bodyCenter", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("h1", { children: "Cube" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)' }, onMouseDown: handleSwitchClick, children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: isSwitched ? "web_traffic" : "drag_pan" }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { position: "absolute", opacity: 0.1, width: 400, height: 400 } }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "cubeContainer", id: "cubeContainer", style: {
                                width: 400,
                                height: 400,
                                display: "grid",
                                placeItems: "center",
                                placeContent: "center",
                                borderRadius: 30,
                                perspective: 400,
                                position: 'relative'
                            }, onMouseMove: handleMouse, onMouseLeave: handleMouseLeave, children: [["top-left",
                                    "top-center",
                                    "top-right",
                                    "center-left",
                                    "center-center",
                                    "center-right",
                                    "bottom-left",
                                    "bottom-center",
                                    "bottom-right"].map((id, index) => ((0, jsx_runtime_1.jsx)("div", { className: "section", "data-section": index, id: id, onMouseDown: gridClick }, id))), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: 'cube', 
                                    // drag
                                    // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    // onDragEnd={handleDragEnd}
                                    style: {
                                        display: "flex",
                                        // justifyContent:"center",
                                        // alignItems:"center",
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start",
                                        rotateX: compositeRotateX,
                                        rotateY: compositeRotateY,
                                        position: 'absolute',
                                        transform: "translate(-50%,-50%)"
                                    }, whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "cube", drag: true, dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 }, onDragEnd: handleDragEnd, style: {
                                            position: 'absolute',
                                            justifySelf: "center",
                                            backgroundColor: "rgba(50,50,50,0)"
                                            // transform:"translate(-50%,-50%)"
                                        } }) })] })] })] }) }));
}
//# sourceMappingURL=Cube.js.map