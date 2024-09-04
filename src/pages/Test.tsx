import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import lottieJson from '../media/Worm.json';

export default function Test() {


    return (
        <div className="bodyCenter">
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <h1>Test</h1>
            </div>
                
        <div id="canvasDiv" className="canvasDiv" style={{border:0}}>
        <Lottie
            loop
            animationData={lottieJson}
            play
            // style={{ width: 150, height: 150 }}
            style={{ width:'100%', height:'100%'}}
        />
    </div>


        </div>
    );
}