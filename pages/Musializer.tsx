import React from 'react'
import {useState, useEffect, useRef} from "react"
import {motion, useAnimation, useDragControls} from "framer-motion"
import { Slider } from '../components/Slider'

// const AudioVisualiser: React.FC<{ audioData: Uint8Array }> = ({ audioData }) => {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
//     useEffect(() => {
//       const draw = () => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const height = canvas.height;
//         const width = canvas.width;
//         const context = canvas.getContext('2d');
//         if (!context) return;
//         let x = 0;
//         const sliceWidth = (width * 1.0) / audioData.length;
  
//         context.lineWidth = 2;
//         context.strokeStyle = '#000000';
//         context.clearRect(0, 0, width, height);
  
//         context.beginPath();
//         context.moveTo(0, height / 2);
//         for (const item of audioData) {
//           const y = (item / 255.0) * height;
//           context.lineTo(x, y);
//           x += sliceWidth;
//         }
//         context.lineTo(x, height / 2);
//         context.stroke();
//       };
  
//       draw();
//     }, [audioData]);
  
//     return <canvas width="600" height="300" ref={canvasRef} />;
//   };


export default function Musializer() {

    const [isPlaying, setIsPlaying] = useState(true)
    const [volume, setVolume] = useState(50)
    const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyserRef = useRef<AnalyserNode| null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    const [bassIntensity, setBassIntensity] = useState(0);

    useEffect(() => {
       if (!audioRef.current) {
        audioRef.current = new Audio("./media/sounds/check1.mp3") 
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        analyserRef.current = audioContextRef.current.createAnalyser();
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        // analyserRef.current.fftSize = 256; 
        // analyserRef.current.fftSize = 128;
        analyserRef.current.fftSize = 64;
        const bufferLength = analyserRef.current.frequencyBinCount;
        setAudioData(new Uint8Array(bufferLength));
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume / 100;
        }
      }, [volume]);

      useEffect(() => {
        const updateAudioData = () => {
          if (analyserRef.current) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            setAudioData(dataArray);

            const bassRange = dataArray.slice(0, dataArray.length / 4); 
            const intensity = bassRange.reduce((sum, value) => sum + value, 0);
            setBassIntensity(intensity);

          }
          requestAnimationFrame(updateAudioData);
        };
        updateAudioData();
      }, []);

    function handlePlayClick() {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current?.play()
        }
        else if (!isPlaying) {
            audioRef.current?.pause()
        }
    }

    return(
        <div className="bodyCenter">
                <h1>Musializer</h1>

                <div style={{display:"flex", flexDirection:'row', justifyContent:'center'}}>                

                    <motion.button className="playButton" style={{display:'flex', justifyContent:'center', alignItems:'center'}} onMouseDown={handlePlayClick}
                    animate={{
                        scale: 1 + bassIntensity / 50000, 
                    }}
                    transition={{ duration: 0.1 }} 
                    >
                        <span className="material-symbols-outlined" style={{fontSize: '85px'}}>
                        {isPlaying? "play_arrow" : "pause"} 
                        </span>
                    </motion.button>


                    <Slider value={volume} set={setVolume}>
                    </Slider>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                    <div className="visualizer">
                        {Array.from(audioData).reverse().map((value, index) => (
                            <motion.div
                            key={index}
                            className="bar"
                            initial={{ height: 0 }}
                            animate={{ height: value }}
                            transition={{ duration: 0.05 }}
                            />
                        ))}
                    </div>

                    <div className="visualizer">
                        {Array.from(audioData).map((value, index) => (
                            <motion.div
                            key={index}
                            className="bar"
                            initial={{ height: 0 }}
                            animate={{ height: value }}
                            transition={{ duration: 0.05 }}
                            />
                        ))}
                    </div>
                </div>

            {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                <AudioVisualiser audioData={audioData} />
            </div> */}


        </div>
    )
}