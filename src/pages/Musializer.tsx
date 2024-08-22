import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "../components/Slider";

export default function Musializer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [bass, setBass] = useState(false);
  const [test, setTest] = useState(0);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
  const [bassIntensity, setBassIntensity] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("./media/sounds/check1.mp3");
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaElementSource(
        audioRef.current
      );
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasDiv = document.getElementById("canvasDiv");
    if (!canvas || !canvasDiv) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let amount = 0;
    let mouse = { x: canvas.width/ 2, y: canvas.height/ 2 };
    let bounceRadius = 1;

const color = [
  getComputedStyle(document.documentElement).getPropertyValue(
    "--particle-color"
  ),
];


    class Particle {
      x: number;
      y: number;
      dest: { x: number; y: number };
      r: number;
      vx: number;
      vy: number;
      accX: number;
      accY: number;
      friction: number;
      color: string[];

      constructor(x: number, y: number) {
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

    const resizeCanvas = () => {
      const rect = canvasDiv.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

    };
    const render = () => {
      if (analyserRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        setAudioData(dataArray);

        const bassRange = dataArray.slice(0, 2);
        const intensity = bassRange.reduce((sum, value) => sum + value, 0);
        setBass(intensity > 509);
        setBassIntensity(intensity);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [bassIntensity]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      handlePlayClick();
    }
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
        if (audioRef.current) {
            audioRef.current.currentTime = 15
        }
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  return (
    <div className="bodyCenter">
      <motion.h1>Musializer</motion.h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.button
          className="playButton"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseDown={handlePlayClick}
          animate={{ scale: bass ? 1.5 : 1 }}
          transition={{ type: "spring", duration: 0.2 }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "50px" }}
          >
            {isPlaying ? "play_arrow" : "pause"}
          </span>
        </motion.button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "50px",
          }}
        >
          <Slider value={volume} set={setVolume}>
            Volume
          </Slider>
          <Slider value={bassIntensity} set={setBassIntensity}>
            Intensity
          </Slider>
          <Slider value={test} set={setTest}>
            Test
          </Slider>
        </div>
      </div>
      <div style={{ margin: "10px" }} />
      <div id="canvasDiv" style={{ height: "18rem", position: "relative" }}>
        <canvas ref={canvasRef} style={{ position: "absolute" }}></canvas>
      </div>
    </div>
  );
}
