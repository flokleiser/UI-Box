import React, { useEffect } from 'react';


export default function Tether() {

    useEffect(() => {
        const canvasTether = document.querySelector("#sceneTether") as HTMLCanvasElement;
        const ctx = canvasTether.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
        const mouse = { x: 0, y: 0 };
        const radius = 50;
        let isDragging = false;

        let isDragging2 = false;

        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = ww / 2;
        let centerY = wh / 2;

        let centerX2 = ww / 4;
        let centerY2 = wh / 3;

        let particleX1 = centerX;
        let particleY1 = centerY;
        let vx1 = 0; 
        let vy1 = 0; 

        let particleX2 = centerX2;
        let particleY2 = centerY2;
        let vx2 = 0; 
        let vy2 = 0; 



        const damping = 0.9; 
        const stiffness = 0.1; 
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';

        
        const onMouseMove = (e:MouseEvent) => {
            if (isDragging) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                particleX1 = mouse.x;
                particleY1 = mouse.y;
            }

            if (isDragging2) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                particleX2 = mouse.x;
                particleY2 = mouse.y;
            }

        };

        const onTouchMove = (e:TouchEvent) => {
            if (e.touches.length > 0 && isDragging) {
                // mouse.x = e.touches[0].clientX;
                // mouse.y = e.touches[0].clientY;
                particleX1 = mouse.x;
                particleY1 = mouse.y;
            }

            if (e.touches.length > 0 && isDragging2) {
                // mouse.x = e.touches[0].clientX;
                // mouse.y = e.touches[0].clientY;

                particleX2 = mouse.x;
                particleY2 = mouse.y;
            }

        };

        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
            }
            if (isDragging2) {
                isDragging2 = false;
            }
        };

        const onMouseDown = (e:MouseEvent) => {
            const dist = Math.hypot(e.clientX - particleX1, e.clientY - particleY1);
            if (dist < radius) {
                isDragging = true;
            }

            const dist2 = Math.hypot(e.clientX - particleX2, e.clientY - particleY2);
            if (dist2 < radius) {
                isDragging2 = true;
            }
        };

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
            }
            if (isDragging2) {
                isDragging2 = false;
            }
        };

        const initscene = () => {
            ww = canvasTether.width = window.innerWidth;
            wh = canvasTether.height = window.innerHeight;
            centerX = ww / 2;
            centerY = wh / 2;
            particleX1 = centerX;
            particleY1 = centerY;
            vx1 = 0;
            vy1 = 0;

            centerX2 = ww / 4;
            centerY2 = wh / 3;
            particleX2 = centerX2;
            particleY2 = centerY2;
            vx2 = 0; 
            vy2 = 0; 

            render();
        };

        const resizeScene = () => {
            ww = canvasTether.width = window.innerWidth;
            wh = canvasTether.height = window.innerHeight;
            centerX = ww / 2;
            centerY = wh / 2;
            particleX1 = centerX;
            particleY1 = centerY;
            vx1 = 0;
            vy1 = 0;

            centerX2 = ww / 4;
            centerY2 = wh / 3;
            particleX2 = centerX2;
            particleY2 = centerY2;
            vx2 = 0; 
            vy2 = 0; 
        }

        let animationFrameId: number;

        const render = () => {
            if (!isDragging) {
                const dx = centerX - particleX1;
                const dy = centerY - particleY1;
                const ax = dx * stiffness;
                const ay = dy * stiffness;
                vx1 += ax;
                vy1 += ay;
                vx1 *= damping;
                vy1 *= damping;
                particleX1 += vx1;
                particleY1 += vy1;
            } else {
                vx1 = 0;
                vy1 = 0;
            }


            if (!isDragging2) {
                const dx2 = centerX2 - particleX2;
                const dy2 = centerY2 - particleY2;
                const ax2 = dx2 * stiffness;
                const ay2 = dy2 * stiffness;
                vx2 += ax2;
                vy2 += ay2;
                vx2 *= damping;
                vy2 *= damping;
                particleX2 += vx2;
                particleY2 += vy2;
            } else {
                vx2 = 0;
                vy2 = 0;
            }

            ctx.clearRect(0, 0, canvasTether.width, canvasTether.height);

            //tether
            ctx.strokeStyle = color;
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(particleX1, particleY1);
            ctx.stroke();


            ctx.strokeStyle = color;
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(centerX2, centerY2);
            ctx.lineTo(particleX2, particleY2);
            ctx.stroke();

            // const springSegments = 20;
            // const springLength = Math.hypot(centerX - particleX1, centerY - particleY1);
            // const segmentLength = springLength / springSegments;
            // const angle = Math.atan2(particleY1 - centerY, particleX1 - centerX);

            // ctx.strokeStyle = color;
            // ctx.lineWidth = 2;
            // ctx.beginPath();
            // for (let i = 0; i <= springSegments; i++) {
            //     const t = i / springSegments;
            //     const offsetX = centerX + t * (particleX1 - centerX);
            //     const offsetY = centerY + t * (particleY1 - centerY);
            //     const wave = Math.sin(t * Math.PI * 2 * 5) * 5; 
            //     const waveX = offsetX + Math.cos(angle + Math.PI / 2) * wave;
            //     const waveY = offsetY + Math.sin(angle + Math.PI / 2) * wave;

            //     if (i === 0) {
            //         ctx.moveTo(waveX, waveY);
            //     } else {
            //         ctx.lineTo(waveX, waveY);
            //     }
            // }
            // ctx.strokeStyle = color;
            // ctx.lineWidth = 10;
            // ctx.lineCap = "round";            
            // ctx.stroke();

            //ball
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(particleX1, particleY1, radius, 0, Math.PI * 2);
            ctx.fill();


            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(particleX2, particleY2, radius/2, 0, Math.PI * 2);
            ctx.fill();

            // requestAnimationFrame(render);
            animationFrameId = requestAnimationFrame(render);
        };


        // window.addEventListener("resize", initscene);
        window.addEventListener("resize", resizeScene);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        initscene();

        return () => {
            // window.removeEventListener("resize", initscene);
            window.removeEventListener("resize", resizeScene);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onTouchEnd);
            // cancelAnimationFrame(render);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);


    return (
        <div>
            <h1>Tether</h1>
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
                id="sceneTether">
            </canvas>
        </div>
    );
}
