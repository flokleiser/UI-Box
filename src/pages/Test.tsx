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

    const [currentSong, setCurrentSong] = useState(music[2]);

    const [audioMotion, setAudioMotion] = useState<AudioMotionAnalyzer | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = currentSong.file;
            audioRef.current.load();
            audioRef.current.currentTime = 48;
        }
    }, [currentSong]);

    useEffect(() => {

        if (audioRef.current && canvasRef.current && !audioMotion) {
            const analyzer = new AudioMotionAnalyzer(canvasRef.current, {
                source: audioRef.current,
                showScaleX: false,
                showPeaks:false,
                showBgColor: false,
                overlay: true,
                mode:4,
                roundBars: true,
                alphaBars: true,
                reflexFit: true,
                reflexBright: 1,
                mirror: 0,
                reflexAlpha: 1,
                reflexRatio: 0.5,
                gradient: 'prism',
                colorMode: 'bar-level',
                linearAmplitude: true,
                linearBoost: 1.5

            });
    
            analyzer.registerGradient('test', {
                bgColor: 'rgba(1,1,1,0)',
                colorStops: [
                    'rgba(255,255,255,0.8)',
                    { color: 'white', pos: 0.6 },
                    { color: '#0f0', level: 0.5 }
                ]
            });
    
            setAudioMotion(analyzer);
        }

    // if (audioRef.current && canvasRef.current && !audioMotion) {
    //     console.log('init')
    //     const analyzer = new AudioMotionAnalyzer(canvasRef.current, {
    //       source: audioRef.current,
    //     //   mode:4, 
    //     //   mode: 3,
    //     //   radial:true
    //     // roundBars: true,
    //     // lumiBars: true,
    //     showScaleX: false,
    //     showPeaks:false,
    //     showBgColor: false,
    //     overlay: true,
    //     gradient: 'test',
    //     // gradient: 'classic'

    //     analyzer.registerGradient( 'test', {
    //         bgColor: 'rgba(1,1,1,0)', // background color (optional) - defaults to '#111'
    //         colorStops: [       // list your gradient colors in this array (at least one color is required)
    //             'rgba(255,255,255,0.8)',        // colors can be defined in any valid CSS format
    //             { color: 'white', pos: .6 }, // in an object, use `pos` to adjust the offset (0 to 1) of a colorStop
    //             { color: '#0f0', level: .5 }  // use `level` to set the max bar amplitude (0 to 1) to use this color
    //         ]
    //     });

        // });
        // setAudioMotion(analyzer);
    //   }
    }, [audioRef.current, canvasRef.current, audioMotion]);


    return (
        <div className="bodyCenter">
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <motion.h1>Test</motion.h1>

            </div>
                

            <audio ref={audioRef} controls style={{width:"100%"}}>
                <source src={currentSong.file} type="audio/mpeg" />
            </audio>


            <div style={{ padding: "5px" }} />


            <div id="canvasDiv" className="canvasDiv" ref={canvasRef}>
            </div>


        </div>
    );
}