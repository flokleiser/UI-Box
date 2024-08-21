"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Musializer;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const framer_motion_1 = require("framer-motion");
const Slider_1 = require("../components/Slider");
function Musializer() {
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(true);
    const [volume, setVolume] = (0, react_2.useState)(50);
    const [test, setTest] = (0, react_2.useState)(0);
    const [bass, setBass] = (0, react_2.useState)(false);
    const [audioData, setAudioData] = (0, react_2.useState)(new Uint8Array(0));
    const audioRef = (0, react_2.useRef)(null);
    const analyserRef = (0, react_2.useRef)(null);
    const audioContextRef = (0, react_2.useRef)(null);
    const [bassIntensity, setBassIntensity] = (0, react_2.useState)(0);
    const canvasRef = (0, react_2.useRef)(null);
    const [resetTrigger, setResetTrigger] = (0, react_2.useState)(0);
    (0, react_2.useEffect)(() => {
        const handleThemeToggle = () => resetScene();
        setTimeout(() => {
            const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
            if (darkmodeToggleButton) {
                darkmodeToggleButton.addEventListener('click', handleThemeToggle);
            }
        }, 1000);
        return () => {
            const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener('click', handleThemeToggle);
            }
        };
    }, []);
    (0, react_2.useEffect)(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio("./media/sounds/check1.mp3");
            // audioRef.current = new Audio("./media/sounds/didITellYou.mp3") 
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
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
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [volume, isPlaying]);
    (0, react_2.useEffect)(() => {
        const canvasDiv = document.getElementById("canvasDiv");
        if (!canvasRef.current || !canvasDiv || !audioRef.current)
            return;
        const canvasDivRect = canvasDiv.getBoundingClientRect();
        let ww = canvasDivRect.width;
        let wh = canvasDivRect.height;
        console.log(canvasDivRect.width, canvasDivRect.height);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true, });
        var particles = [];
        let amount = 0;
        let mouse = { x: ww / 2, y: wh / 2 };
        let bounceRadius = 1;
        let radius = 0.5;
        const color = [
            getComputedStyle(document.documentElement).getPropertyValue("--particle-color"),
        ];
        class Particle {
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
                this.friction = 0.7;
                this.color = color;
            }
            render() {
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
                let a = this.x - mouse.x;
                let b = this.y - mouse.y;
                let distance = Math.sqrt(a * a + b * b);
                if (distance < bounceRadius * 60) {
                    this.accX = this.x - mouse.x;
                    this.accY = this.y - mouse.y;
                    this.vx += this.accX;
                    this.vy += this.accY;
                }
                if (distance > bounceRadius * 250) {
                    this.accX = (this.dest.x - this.x) / 10;
                    this.accY = (this.dest.y - this.y) / 10;
                    this.vx += this.accX;
                    this.vy += this.accY;
                }
            }
        }
        function initScene() {
            // ww = canvas.width = window.innerWidth;
            // wh = canvas.height = window.innerHeight;
            // canvas.height = ww
            // canvas.width = wh
            ww = canvas.width = canvasDivRect.width;
            wh = canvas.height = canvasDivRect.height;
            // const rectWidth= ww /2
            // const rectHeight= wh /2 
            // const rectWidth= ww 
            // const rectHeight= wh 
            // const rectWidth= canvasDivRect.width - 100
            const rectWidth = canvasDivRect.width;
            const rectHeight = canvasDivRect.height;
            const centerX = ww / 2;
            const centerY = (wh / 2) - 100;
            // const particleSpacing = 15; 
            const particleSpacing = 20;
            console.log(rectWidth, rectHeight);
            particles = [];
            for (let x = -rectWidth; x <= rectWidth; x += particleSpacing) {
                for (let y = -rectHeight; y <= rectHeight; y += particleSpacing) {
                    particles.push(new Particle(centerX + x, centerY + y));
                }
            }
            amount = particles.length;
        }
        const updateAndRender = () => {
            if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                setAudioData(dataArray);
                const bassRange = dataArray.slice(0, 2);
                const intensity = bassRange.reduce((sum, value) => sum + value, 0);
                const bass = intensity > 509;
                setBass(bass);
                bounceRadius = bass ? 2 : 0.5;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.render();
            });
            requestAnimationFrame(updateAndRender);
        };
        window.addEventListener("resize", initScene);
        initScene();
        requestAnimationFrame(updateAndRender);
        return () => {
            window.removeEventListener("resize", initScene);
        };
    }, [resetTrigger]);
    function resetScene() {
        setResetTrigger(prev => prev + 1);
        console.log('reset');
    }
    const handleKeyDown = (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            handlePlayClick();
        }
    };
    function handlePlayClick() {
        var _a, _b;
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.currentTime = 15;
            }
            (_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.play();
        }
        else {
            (_b = audioRef.current) === null || _b === void 0 ? void 0 : _b.pause();
        }
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement(framer_motion_1.motion.h1, null, "Musializer"),
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
            react_1.default.createElement(framer_motion_1.motion.button, { className: "playButton", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, onMouseDown: handlePlayClick, animate: { scale: bass ? 1.5 : 1 }, transition: { type: "spring", duration: 0.2 } },
                react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: '50px' } }, isPlaying ? "play_arrow" : "pause")),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', paddingLeft: '50px' } },
                react_1.default.createElement(Slider_1.Slider, { value: volume, set: setVolume }, "Volume"),
                react_1.default.createElement(Slider_1.Slider, { value: bassIntensity, set: setBassIntensity }, "Intensity"),
                react_1.default.createElement(Slider_1.Slider, { value: test, set: setTest }, "Test"))),
        react_1.default.createElement("div", { style: { margin: '10px' } }),
        react_1.default.createElement("div", { id: "canvasDiv", style: { height: '18rem', position: 'relative' } },
            react_1.default.createElement("canvas", { ref: canvasRef, style: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    // top: 0,
                    // left: 0,
                    // overflow: "hidden",
                    // zIndex: -10,
                } }))));
}
