import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "../components/Slider";
import { music} from "../components/Music";
import Overlay from "../components/Overlay";

import AudioMotionAnalyzer from 'audiomotion-analyzer';
import check1 from '../media/sounds/check1.mp3'

export default function Test() {
    const canvasRef = useRef<HTMLDivElement>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [currentSong, setCurrentSong] = useState(music[0]);

    const [audioMotion, setAudioMotion] = useState<AudioMotionAnalyzer | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
        }
    }, [currentSong]);

    useEffect(() => {
    if (audioRef.current && canvasRef.current && !audioMotion) {
        console.log('init')
        const analyzer = new AudioMotionAnalyzer(canvasRef.current, {
          source: audioRef.current,
          mode:4, 
        //   mode: 3,
        //   radial:true
        roundBars: true,
        lumiBars: true,
        showScaleX: false,
        // loRes: true,

        });
        setAudioMotion(analyzer);
      }
    }, [audioRef.current, canvasRef.current, audioMotion]);



    return (
        <div className="bodyCenter">
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <motion.h1>Test</motion.h1>

            </div>
                

            <audio ref={audioRef} controls>
                <source src={currentSong.file} type="audio/mpeg" />
            </audio>


            <div style={{ padding: "5px" }} />


            <div id="canvasDiv" className="canvasDiv" ref={canvasRef}>
            </div>


        </div>
    );
}