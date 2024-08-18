import React from 'react'
import {useState, useEffect, useRef} from "react"
import {motion, useAnimation, useDragControls} from "framer-motion"
import { Slider } from '../components/Slider'

export default function Musializer() {

    const [isPlaying, setIsPlaying] = useState(true)
    const [volume, setVolume] = useState(50)
    const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyserRef = useRef<AnalyserNode| null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
       if (!audioRef.current) {
        audioRef.current = new Audio("./media/sounds/check1.mp3") 
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        analyserRef.current = audioContextRef.current.createAnalyser();
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        analyserRef.current.fftSize = 256; 
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

                    <button className="playButton" style={{display:'flex', justifyContent:'center', alignItems:'center'}} onMouseDown={handlePlayClick}>
                        <span className="material-symbols-outlined" style={{fontSize: '85px'}}>
                        {isPlaying? "play_arrow" : "pause"} 
                        </span>
                    </button>


                    <div className="volumeSliderDiv">
                        <div className="volumeSlider">
                            <Slider value={volume} set={setVolume}>
                            </Slider>
                        </div>
                    </div> 
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
    )
}