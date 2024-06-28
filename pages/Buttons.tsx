import React, { ButtonHTMLAttributes, useState } from 'react'
import {motion} from "framer-motion"

export default function Buttons() {

    const [isPressed, setIsPressed] = useState(false);
    const [isPressedEffect, setIsPressedEffect] = useState(false)
    const [isToggled, setIsToggled] = useState([false, false, false])

    const handlePressEffect = () => {
      setIsPressedEffect(true);
      setTimeout(() => {
        setIsPressed(false);
      }, 50);
    }

    const handlePress = () => {
        setIsPressed(true);
        setTimeout(() => {
          setIsPressed(false);
        }, 500);
      };

    const handleToggle = (index:number) => {
        const updateToggle= isToggled.map((state, i) =>
            i === index ? !state : state
          );
          setIsToggled(updateToggle)
      }


    return(
        <div>
            <h1> Buttons </h1>

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <div className="buttonContainer">
                <div className="buttonRow">

                <button className="button1" id="buttonTest" onMouseDown={handlePress}> </button>
                <button className="button1" id="buttonTest" onMouseDown={handlePress}> </button>
                <button className="button1" > </button>

                </div>

                <div className="buttonRow">
                <button className="button1"  > </button>
                <button className="button1"  > </button>
                <button className="button1"  > </button>

                </div>

                <div className="buttonRow">
                <button className="button1"  > </button>
                <button className="button1"  > </button>
                <button className="button1"  > </button>

                </div>
            </div>

            <div className="buttonColumn">
                <button className={`${isToggled [0] ? 'button2toggled' : 'button2'}`} id="buttonToggle1" onMouseDown={() => handleToggle(0)}></button>
                <button className={`${isToggled [1] ? 'button2toggled' : 'button2'}`} id="buttonToggle2" onMouseDown={() => handleToggle(1)}></button>
                <button className={`${isToggled [2] ? 'button2toggled' : 'button2'}`}id="buttonToggle3" onMouseDown={() => handleToggle(2)}></button>
            </div>

            </div>

        </div>
    )
}
