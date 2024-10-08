import React from "react";

interface SliderProps{
    // children: string;
    children: React.ReactNode;
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
      <div className="volumeSliderDiv">
        <input className="volumeSlider"
          value={value}
          type="range"
          min={min}
          max={max}
          onChange={(e) => set(parseFloat(e.target.value))}
        />
        <h2 className="volumeSlider" style={{width:'40px', marginLeft:'5px'}}>{children}</h2>
        </div>
    );
  }