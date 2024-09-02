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

    //song selection and duration
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
        }
    }, [currentSong]);

    //audio setup
    // useEffect(() => {
    //     if (!audioRef.current) {
    //         audioRef.current = new Audio(currentSong.file);

    //         // audioContextRef.current = new (window.AudioContext ||
    //         //     (window as any).webkitAudioContext)();

    //         // const source = audioContextRef.current.createMediaElementSource(
    //         //     audioRef.current
    //         // );

    //         audioRef.current.controls = true;
    //         audioRef.current.crossOrigin = 'anonymous';

    //         // audioContainer?.append(audioRef.current);

    //         // analyserRef.current = audioContextRef.current.createAnalyser();
    //         // source.connect(analyserRef.current);
    //         // analyserRef.current.connect(audioContextRef.current.destination);
    //         // analyserRef.current.fftSize = 256;
    //         // const bufferLength = analyserRef.current.frequencyBinCount;
    //         // setAudioData(new Uint8Array(bufferLength));

    //             if (canvasRef.current) {

    //                 canvasRef.current.append(audioRef.current);

    //                 console.log('canvasRef found')
    //                 audioMotion = new AudioMotionAnalyzer(canvasRef.current, {
    //                 source: audioRef.current,
    //             })
    //         }
    //     }
    // }, [audioRef.current]);

    useEffect(() => {
    if (audioRef.current && canvasRef.current && !audioMotion) {
        // console.log('canvasRef found');
        console.log('init')
        const analyzer = new AudioMotionAnalyzer(canvasRef.current, {
          source: audioRef.current,
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
