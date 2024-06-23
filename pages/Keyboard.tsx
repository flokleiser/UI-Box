//https://github.com/bobboteck/JoyStick?tab=readme-ov-file

import React, { useState, useEffect } from 'react';

export default function Keyboard() {
    const [position, setPosition] = useState({ x: 50, y: 50 }); 
    const [initialPosition] = useState({ x: 50, y: 50 });
    const step = 15; 

    const handleKeyDown = (event: KeyboardEvent) => {
        const { key } = event;
        setPosition((prevPosition) => {
            let newPosition = { ...prevPosition };
            if (key === 'w') {
                newPosition.y = initialPosition.y - step;
            } else if (key === 'a') {
                newPosition.x = initialPosition.x - step;
            } else if (key === 's') {
                newPosition.y = initialPosition.y + step;
            } else if (key === 'd') {
                newPosition.x = initialPosition.x + step;
            }
            return newPosition;
        });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        const { key } = event;
        if (['w', 'a', 's', 'd'].includes(key)) {
            setPosition(initialPosition);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div>
            <h1>Keyboard</h1>
            <div
                style={{
                    position: 'absolute',
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.1s, top 0.1s',
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                }}
            />
        </div>
    );
}
