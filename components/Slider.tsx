import React from "react";

interface SliderProps{
    children: string;
    value: number;
    set: (newValue: number) => void;
    min?: number;
    max?: number;
  }

  export function Slider({
    value,
    children,
    set,
    min = 0,
    max = 100 
  }: SliderProps) {
    return (
      // <label>
      // <div style={{display: 'flex',alignItems: 'center'}}>
      <div className="volumeSliderDiv">
        {/* <h2 style={{width:'100px'}}>{children}</h2> */}
        <input className="volumeSlider"
          value={value}
          type="range"
          min={min}
          max={max}
          onChange={(e) => set(parseFloat(e.target.value))}
        />
        <h2 className="volumeSlider" style={{width:'100px', marginLeft:'25px'}}>{children}</h2>
        </div>
      // </label>
    );
  }