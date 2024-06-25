//https://github.com/bobboteck/JoyStick?tab=readme-ov-file

import React, { useEffect, useState } from 'react';

export default function Joystick() {

    useEffect(() => {
        const canvasKeyboard= document.querySelector("#canvasKeyboard") as HTMLCanvasElement;
        const ctx = canvasKeyboard.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
        const mouse = { x: 0, y: 0 };
        // const radius = 100;
        const radius = 75
        let isDragging = false;
        let maxDistance = 80;
        let isMovingKeys = false;

        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = ww / 2;
        let centerY = wh / 2;


        let circleX = centerX;
        let circleY = centerY;
        let vx = 0; 
        let vy = 0; 

        const damping = 0.8; 
        const stiffness = 0.05; 
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';

        const keyState: { [key: string]: boolean } = {
            w: false,
            a: false,
            s: false,
            d: false,
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (keyState[event.key] !== undefined) {
                keyState[event.key] = true;
                isMovingKeys = true;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (keyState[event.key] !== undefined) {
                keyState[event.key] = false;
                isMovingKeys = Object.values(keyState).some(state => state);
            }
        };

        const updatePosition = () => {
            if (keyState.w) circleY -= 10;
            if (keyState.a) circleX -= 10;
            if (keyState.s) circleY += 10;
            if (keyState.d) circleX += 10;

            const dx = circleX - centerX;
            const dy = circleY - centerY;
            const dist = Math.hypot(dx, dy);

            if (dist > maxDistance) {
                const angle = Math.atan2(dy, dx);
                circleX = centerX + maxDistance * Math.cos(angle);
                circleY = centerY + maxDistance * Math.sin(angle);
            }
        };
        

        const initscene = () => {
            ww = canvasKeyboard.width = window.innerWidth;
            wh = canvasKeyboard.height = window.innerHeight;
            centerX = ww / 2;
            centerY = wh / 2;
            circleX = centerX;
            circleY = centerY;
            vx = 0;
            vy = 0;
            render();
        };

        const resizeScene = () => {
            ww = canvasKeyboard.width = window.innerWidth;
            wh = canvasKeyboard.height = window.innerHeight;
            centerX = ww / 2;
            centerY = wh / 2;
            circleX = centerX;
            circleY = centerY;
            vx = 0;
            vy = 0;
        }

        let animationFrameId: number;

        const render = () => {

            // const distToCenter = Math.hypot(circleX - centerX, circleY - centerY) 

            if (!isMovingKeys) {
                const dx = centerX - circleX;
                const dy = centerY - circleY;
                const ax = dx * stiffness;
                const ay = dy * stiffness;
                vx += ax;
                vy += ay;
                vx *= damping;
                vy *= damping;
                circleX += vx;
                circleY += vy;
            }
           
            else {
                updatePosition();
                vx = 0;
                vy = 0;
            }

            ctx.clearRect(0, 0, canvasKeyboard.width, canvasKeyboard.height);

            //tether
            // ctx.strokeStyle = color;
            // ctx.lineWidth = 10;
            // ctx.lineCap = "round";
            // ctx.beginPath();
            // ctx.moveTo(centerX, centerY);
            // ctx.lineTo(circleX, circleY);
            // ctx.stroke();


            //ball
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
            ctx.fill();

            //big circle
            ctx.strokeStyle = color;
            ctx.lineWidth = 2
            ctx.beginPath();
            ctx.arc(centerX,centerY, maxDistance + (radius/2), 0 , Math.PI*2)
            ctx.stroke(),


            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener("resize", resizeScene);
     
        initscene();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.addEventListener('keydown', handleKeyDown);
            window.removeEventListener("resize", resizeScene);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);


    return (
        <div>
            <h1>Joystick</h1>
            <canvas
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                    zIndex: -10
                }}
                id="canvasKeyboard">
            </canvas>
        </div>
    );
}
