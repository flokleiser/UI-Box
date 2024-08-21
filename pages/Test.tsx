import React from 'react'
import {useState, useEffect, useRef} from "react"
import {motion, useAnimation, useDragControls} from "framer-motion"
import { Slider } from '../components/Slider'

export default function Musializer() {

    const [isPlaying, setIsPlaying] = useState(true)
    const [volume, setVolume] = useState(50)
    const [test, setTest] = useState(0)
    const [bass, setBass] = useState(false)
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
        analyserRef.current.fftSize = 256; 
        const bufferLength = analyserRef.current.frequencyBinCount;
        setAudioData(new Uint8Array(bufferLength));
        }

        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
          }

    const updateAudioData = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          setAudioData(dataArray);


          const bassRange = dataArray.slice(0, 2);
          const intensity = bassRange.reduce((sum, value) => sum + value, 0);

          if (intensity> 509) {
              setBass(true)
          }
          else {
              setBass(false)
          }

        }
        requestAnimationFrame(updateAudioData);
      };
      updateAudioData();

      document.addEventListener('keydown', handleKeyDown);
        
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [volume, isPlaying]);


    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
          event.preventDefault();
          handlePlayClick();
        }
      };

    function handlePlayClick() {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.currentTime = 15
            }
            audioRef.current?.play()
        }
        else {
            audioRef.current?.pause()
        }
    }


    return(
        <div className="bodyCenter">
                <motion.h1>
                    Musializer
                </motion.h1>

                <div style={{display:"flex", flexDirection:'row', justifyContent:'center',alignItems: 'center'}}>                
                    <motion.button className="playButton" style={{display:'flex', justifyContent:'center', alignItems:'center'}} onMouseDown={handlePlayClick}
                    animate={{ scale: bass? 1.5 : 1 }}
                    transition={{type:"spring", duration: 0.8, stiffness: 50 }}
                    >
                        <span className="material-symbols-outlined" style={{fontSize: '50px'}}>
                        {isPlaying? "play_arrow" : "pause"} 
                        </span>
                    </motion.button>

                <div style={{display:'flex',flexDirection:'column', paddingLeft:'50px'}}>
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

                <div style={{margin:'21.44px'}} />


                <div style={{display:'flex', flexDirection:'row'}}>

                    <div className="visualizer">
                     {Array.from(audioData).slice(0, 64).map((value, index) => {
                        const bassValue = index < audioData.length / 4 ? value  : value; 
                        return (
                            <motion.div
                                key={index}
                                className="bar"
                                initial={{ height: 0 }}
                                animate={{ height: bassValue }}
                                transition={{ duration: 0.05 }}
                            />
                        );
                    })} 
                        
                    </div>
                </div>

        </div>
    )
}