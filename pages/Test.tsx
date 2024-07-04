import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion'

export default function Test() {



    return (
        <div className="bodyCenter">
        <div>

        <div style={{display:'flex',flexDirection:'row',justifyContent:'start', alignItems:'center'}}> 
            <h1>Test</h1>

            <motion.button className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)'}} 
            id="randomizerButton" 
            whileHover={{rotate:180}}
            >
                <span className="material-symbols-outlined">
                    swap_horiz
                </span>
            </motion.button>
            </div>

        </div>
        </div>
    );
}