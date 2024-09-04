import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Test() {

    return (
        <div className="bodyCenter">
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <h1>Test</h1>
            </div>

            <div className="music-progress">
                <div className="progress-bar">
                    <span className="progress-line"></span>
                    <input type='range' min='0' max='100' value='0' className="progress" id="progress"/>
                </div>
                <div className="duration">
                    <span className="current-time">00:00</span>
                    <span className="duration-time">00:00</span>
                </div>
            </div>

        </div>
    );
}