import React, { useEffect, useState } from 'react';

export default function Ball() {

    const [resetTrigger, setResetTrigger] = useState(0);
    const [buttonPosition, setButtonPosition] = useState({x:0,y:0})

    const [hoopPosition, setHoopPosition] = useState({x:0,y:0});

    useEffect(() => {
        const canvasBall = document.querySelector("#sceneBall") as HTMLCanvasElement;
        const ctx = canvasBall.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
        const mouse = { x: 0, y: 0 };
        const radius = 25;


        let isDragging = false;
        let isReleased = false; 

        let ww = window.innerWidth;
        let wh = window.innerHeight;

        let centerX = (ww / 2);
        let centerY = (wh / 5) * 3;
        // let centerX = clientX
        // let centerY = clientY

        let ballX = centerX;
        let ballY = centerY;
        let vx = 0; 
        let vy = 0; 


        const damping = 0.7; 
        const stiffness = 0.4; 
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const gravity = 0.3; 

        const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');

        class Hoop {
            centerX: number;
            centerY: number;
            width: number;
            height: number;
            wall: number;
            color: string;
        
            constructor(centerX: number, centerY: number, width: number, height: number, wall:number, color: string) {
                this.centerX = centerX;
                this.centerY = centerY;
                this.width = width;
                this.height = height;
                this.wall= wall;
                this.color = color;
            }
        
            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.rect(this.centerX - this.width / 2, this.centerY + this.height, this.width, this.wall);
                ctx.fill();

                ctx.beginPath();
                ctx.rect(this.centerX - this.width / 2, this.centerY, this.wall, this.height + this.wall);
                ctx.fill();
        
                ctx.beginPath();
                ctx.rect(this.centerX + this.width / 2 - this.wall, this.centerY, this.wall, this.height + this.wall);
                ctx.fill();
            }

            
        
            calculateCollisions() {
                return [
                    { // Bottom bar
                        left: this.centerX - this.width / 2,
                        top: this.centerY + this.height,
                        right: this.centerX + this.width / 2,
                        bottom: this.centerY + this.height + this.wall
                    },
                    { // Left wall
                        left: this.centerX - this.width / 2,
                        top: this.centerY,
                        right: this.centerX - this.width / 2 + this.wall,
                        bottom: this.centerY + this.height + this.wall
                    },
                    { // Right wall
                        left: this.centerX + this.width / 2 - this.wall,
                        top: this.centerY,
                        right: this.centerX + this.width / 2,
                        bottom: this.centerY + this.height + this.wall
                    }
                ];
            }
        }

        const hoop = new Hoop((canvasBall.width / 4) * 3, canvasBall.height / 3, 125,80, 10, color);


        const onMouseMove = (e:MouseEvent) => {
            if (isDragging) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                ballX = mouse.x;
                ballY = mouse.y;
            }
        };

        const onTouchMove = (e:TouchEvent) => {
            if (e.touches.length > 0 && isDragging) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
                ballX = mouse.x;
                ballY = mouse.y;
            }
        };

        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
       
            }
        };

        const onMouseDown = (e:MouseEvent) => {
            centerX = e.clientX
            centerY = e.clientY

            isDragging = true;
            isReleased = false;
        };

        const onMouseUp = (e:MouseEvent) => {
            if (isDragging) {
                isDragging = false;
                const dx = ballX - centerX;
                const dy = ballY - centerY;
                vx = -dx * 0.1;
                vy = -dy * 0.1; 
                isReleased = true;
            }
        };

        const initscene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            isDragging = false;
            isReleased = false; 
            centerX = ww / 2;
            centerY = (wh / 5) * 3;
            ballX = centerX;
            ballY = centerY;
            hoop.centerX = (ww / 4) * 3;
            hoop.centerY = wh / 3;

            setButtonPosition({ x: centerX, y: centerY+75});

            vx = 0;
            vy = 0;
            render();
        };

        const resizeScene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            centerX = ww / 2;
            centerY = (wh / 5) * 3;
            ballX = centerX;
            ballY = centerY;
            vx = 0;
            vy = 0;
            hoop.centerX = (ww / 4) * 3;
            hoop.centerY = wh / 3;

            // setHoopPosition({ x: (canvasBall.width / 4) * 3, y: (canvasBall.height / 3) });                
            setButtonPosition({ x: centerX, y: centerY+75});
        }

        let animationFrameId: number;


        const render = () => {
            if (!isDragging) {
                if (!isReleased) {
                    const dx = centerX - ballX;
                    const dy = centerY - ballY;
                    const ax = dx * stiffness;
                    const ay = dy * stiffness + gravity; 

                    vx += ax;
                    vy += ay;
                    vx *= damping;
                    vy *= damping;

                }
                else {
                    vy += gravity;
                    // vy -= gravity;
                }

                ballX += vx;
                ballY += vy;


                //hoop calculations
                const hoopRects = hoop.calculateCollisions();
                for (const rect of hoopRects) {
                    if (
                        ballX + radius > rect.left && ballX - radius < rect.right 
                        &&
                        ballY + radius > rect.top && ballY - radius < rect.bottom
                    ) {
                        if (ballY - radius < rect.top && ballY + radius > rect.bottom) {
                            vy *= -damping;
                            ballY = ballY < rect.top ? rect.top - radius : rect.bottom + radius;

                        } else if (ballX - radius < rect.left && ballX + radius > rect.right) {
                            vx *= -damping;
                            ballX = ballX < rect.left ? rect.left - radius : rect.right + radius;
                        }
                    }
                }

                if (ballY + radius > wh || ballY - radius < 0) {
                    vy *= -damping;
                    if (ballY + radius > wh ) ballY = wh - radius;
                    if (ballY - radius < 0) ballY = radius;
                }

                if (ballX + radius > ww|| ballX - radius < 0) {
                    vx *= -damping;
                    if (ballX + radius > ww) ballX = ww - radius;
                    if (ballX - radius < 0) ballX = radius;
                }
            }
            else {
                if (isDragging) {
                    if (ballY + radius > wh || ballY - radius < 0) {
                        vy *= -damping;
                        if (ballY + radius > wh ) ballY = wh - radius;
                        if (ballY - radius < 0) {
                            ballY = radius;
                        }
                    }
    
                    if (ballX + radius > ww|| ballX - radius < 0) {
                        vx *= -damping;
                        if (ballX + radius > ww) ballX = canvasBall.width - radius;
                        if (ballX - radius < 0) {
                            ballX = radius;
                        }
                    }
                }
                vx = 0;
                vy = 0;
            }


            ctx.clearRect(0, 0, canvasBall.width, canvasBall.height);

            if (!isReleased) {
                ctx.strokeStyle = color;
                ctx.lineWidth = 10;
                ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(ballX, ballY);
                ctx.stroke();
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
            ctx.fill();


            hoop.draw(ctx);

            animationFrameId = requestAnimationFrame(render);
        };

        const handleThemeToggle = () => {resetScene()}

        window.addEventListener("resize", resizeScene);

        if (darkmodeToggleButton) {
            darkmodeToggleButton.addEventListener('click', handleThemeToggle);
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        initscene();

        return () => {
            window.removeEventListener("resize", resizeScene);
            
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener('click', handleThemeToggle);
            }

            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [resetTrigger]);
    // }, []);


    function resetScene() {
        setResetTrigger(prev => prev + 1);
    }


    return (
        <div>
            <h1>Ball</h1>

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
                id="sceneBall">
            </canvas>
        </div>
    );
}