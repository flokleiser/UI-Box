import React from "react";

interface SliderProps{
    value: number;
    set: (newValue: number) => void;
    min?: number;
    max?: number;
  }

  export function Slider({
    value,
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
        </div>
    );
  }