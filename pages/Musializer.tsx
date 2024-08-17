import React from 'react'
import {useState, useEffect, useRef} from "react"
import {motion, useAnimation, useDragControls} from "framer-motion"

interface SliderProps{
    value: number;
    set: (newValue: number) => void;
    min?: number;
    max?: number;
  }

  export function Slider({
    value,
    set,
    min = 0,
    max = 100 
  }: SliderProps) {
    return (
        <div className="volumeSliderDiv">
        <input className="volumeSlider"
          value={value}
          type="range"
          min={min}
          max={max}
          onChange={(e) => set(parseFloat(e.target.value))}
        />
        </div>
    );
  }

export default function Musializer() {

    const [isPlaying, setIsPlaying] = useState(true)
    const [volume, setVolume] = useState(50)

    // const [audioData, setAudioData] = useState(new Uint8Array(0));
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
        // analyserRef.current.maxDecibels = 25
        // analyserRef.current.minDecibels= 2

        source.connect(analyserRef.current);

        analyserRef.current.connect(audioContextRef.current.destination);
        analyserRef.current.fftSize = 256; 
        // analyserRef.current.fftSize = 32;
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
            console.log('playing')
        }
        else if (!isPlaying) {
            audioRef.current?.pause()
            console.log('paused')
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
                    // {/* {Array.from(audioData.slice(0, 20)).map((value, index) => ( */}
                        <motion.div
                        key={index}
                        className="bar"
                        initial={{ height: 0 }}
                        animate={{ height: value }}
                        // animate={{ height: value*0.5 }}
                        transition={{ duration: 0.05 }}
                        />
                    ))}
        </div>
               

        </div>
    )
}