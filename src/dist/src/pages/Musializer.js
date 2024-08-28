"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Musializer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const Slider_1 = require("../components/Slider");
const check1_mp3_1 = __importDefault(require("../../assets/media/sounds/check1.mp3"));
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    const [volume, setVolume] = (0, react_1.useState)(50);
    const [bass, setBass] = (0, react_1.useState)(false);
    const [test, setTest] = (0, react_1.useState)(0);
    const [audioData, setAudioData] = (0, react_1.useState)(new Uint8Array(0));
    const canvasRef = (0, react_1.useRef)(null);
    const audioRef = (0, react_1.useRef)(null);
    const analyserRef = (0, react_1.useRef)(null);
    const audioContextRef = (0, react_1.useRef)(null);
    const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
    const [bounceRadiusIntensity, setBounceRadiusIntensity] = (0, react_1.useState)(1);
    (0, react_1.useEffect)(() => {
        const timeoutId = setTimeout(resetScene, 100);
        return () => clearTimeout(timeoutId);
    }, []);
    (0, react_1.useEffect)(() => {
        const handleThemeToggle = () => resetScene();
        setTimeout(() => {
            const darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
            if (darkmodeToggleButton) {
                darkmodeToggleButton.addEventListener("click", handleThemeToggle);
            }
        }, 1000);
        return () => {
            const darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener("click", handleThemeToggle);
            }
        };
    }, []);
    //audio setup
    (0, react_1.useEffect)(() => {
        if (!audioRef.current) {
            // audioRef.current = new Audio("./media/sounds/check1.mp3");
            audioRef.current = new Audio(check1_mp3_1.default);
            audioContextRef.current = new (window.AudioContext ||
                window.webkitAudioContext)();
            const source = audioContextRef.current.createMediaElementSource(audioRef.current);
            analyserRef.current = audioContextRef.current.createAnalyser();
            source.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
            analyserRef.current.fftSize = 256;
            const bufferLength = analyserRef.current.frequencyBinCount;
            setAudioData(new Uint8Array(bufferLength));
        }
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [volume, isPlaying]);
    //canvas setup
    (0, react_1.useEffect)(() => {
        const canvas = canvasRef.current;
        const canvasDiv = document.getElementById("canvasDiv");
        if (!canvas || !canvasDiv)
            return;
        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        });
        let animationFrameId;
        let particles = [];
        let bounceCenter = { x: canvas.width / 2, y: canvas.height / 2 };
        let bounceRadius = 1;
        const color = [
            getComputedStyle(document.documentElement).getPropertyValue("--particle-color"),
        ];
        class Particle {
            x;
            y;
            dest;
            r;
            vx;
            vy;
            accX;
            accY;
            friction;
            color;
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.dest = {
                    x: x,
                    y: y,
                };
                this.r = 5;
                this.vx = 0;
                this.vy = 0;
                this.accX = 0;
                this.accY = 0;
                // this.friction = 0.7;
                this.friction = 0.9;
                this.color = color;
                // this.frequency = 0.01;
                // this.amplitude = 100;
            }
            render() {
                // this.dest.x = this.x
                // this.dest.y = canvas!.height/2 + Math.sin((this.x * this.frequency) + (Date.now() * 0.001)) * this.amplitude;
                // this.dest.y = Math.sin((this.x * this.frequency) + (Date.now() * 0.001)) * this.amplitude;
                this.accX = (this.dest.x - this.x) / 100;
                this.accY = (this.dest.y - this.y) / 100;
                this.vx += this.accX;
                this.vy += this.accY;
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.x += this.vx;
                this.y += this.vy;
                ctx.fillStyle = this.color[0];
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fill();
                let a = this.x - bounceCenter.x;
                let b = this.y - bounceCenter.y;
                let distance = Math.sqrt(a * a + b * b);
                if (distance < bounceRadius * 60) {
                    // this.accX = this.x - bounceCenter.x;
                    // this.accY = this.y - bounceCenter.y;
                    this.accX = (this.x - bounceCenter.x) / 10;
                    this.accY = (this.y - bounceCenter.y) / 10;
                    this.vx += this.accX;
                    this.vy += this.accY;
                }
                if (distance > bounceRadius * 250) {
                    // this.accX = (this.dest.x - this.x) / 10;
                    // this.accY = (this.dest.y - this.y) / 10;
                    this.vx += this.accX;
                    this.vy += this.accY;
                    this.accX = (this.dest.x - this.x) / 5;
                    this.accY = (this.dest.y - this.y) / 5;
                    // this.vx += this.accX * 2;
                    // this.vy += this.accY * 2;
                }
            }
        }
        const resizeCanvas = () => {
            const rect = canvasDiv.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        const initScene = () => {
            const rect = canvasDiv.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const particleSpacing = 20;
            particles = [];
            for (let x = -rect.width; x <= rect.width; x += particleSpacing) {
                for (let y = -rect.height; y <= rect.height; y += particleSpacing) {
                    particles.push(new Particle(centerX + x, centerY
                        + y));
                }
            }
        };
        const render = () => {
            const rect = canvasDiv.getBoundingClientRect();
            // let bounceCenter = { x: rect.width / 2, y: rect.height / 2 };
            if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);
                const bassRange = dataArray.slice(0, 2);
                const intensity = bassRange.reduce((sum, value) => sum + value, 0);
                const bass = intensity > 509;
                setBass(bass);
                bounceRadius = bass ? 1.5 : 0;
                bounceRadius = bass ? bounceRadiusIntensity : 0;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.render();
            });
            animationFrameId = requestAnimationFrame(render);
        };
        initScene();
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        render();
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [resetTrigger]);
    //handle keys
    const handleKeyDown = (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            handlePlayClick();
        }
    };
    const handlePlayClick = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.currentTime = 15;
            }
            audioRef.current?.play();
        }
        else {
            audioRef.current?.pause();
        }
    };
    function resetScene() {
        setResetTrigger((prev) => prev + 1);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bodyCenter", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.h1, { children: "Musializer Test" }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }, children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "playButton", style: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }, onMouseDown: handlePlayClick, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 }, children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", style: { fontSize: "50px" }, children: isPlaying ? "play_arrow" : "pause" }) }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            display: "flex",
                            flexDirection: "column",
                            paddingLeft: "50px",
                        }, children: [(0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: volume, set: setVolume, children: "Volume" }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: bounceRadiusIntensity, set: setBounceRadiusIntensity, min: 0, max: 3, children: "Intensity" }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: test, set: setTest, children: "Test" })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { padding: "5px" } }), (0, jsx_runtime_1.jsx)("div", { id: "canvasDiv", className: "canvasDiv", children: (0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, style: {
                        position: "absolute",
                        marginLeft: "-3px",
                        marginTop: "-3px",
                    } }) })] }));
}
//# sourceMappingURL=Musializer.js.map