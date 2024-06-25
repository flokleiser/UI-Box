import React, { useEffect, useState } from 'react';

export default function Ball() {

    const [resetTrigger, setResetTrigger] = useState(0);
    const [buttonPosition, setButtonPosition] = useState({x:0,y:0})

    useEffect(() => {
        const canvasBall = document.querySelector("#sceneBall") as HTMLCanvasElement;
        const ctx = canvasBall.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
        const mouse = { x: 0, y: 0 };
        const radius = 25;
        let isDragging = false;
        let isReleased = false; 

        let ww = window.innerWidth;
        let wh = window.innerHeight;

        // hoop constants
        let hoopXCenter= (canvasBall.width/ 4)*3
        let hoopYCenter= canvasBall.height/3

        let hoopXTopLeft = ((canvasBall.width/4)*3) - 40
        let hoopYTopLeft = (canvasBall.height/3) - 40

        let hoopXTopRight = ((canvasBall.width/4)*3) + 40
        let hoopYTopRight = (canvasBall.height/3) + 40

        let hoopXBottomCenter= ((canvasBall.width/ 4)*3) + 30
        let hoopYBottomCenter= (canvasBall.height/3) + 30
        // end hoop constants




        let centerX = (ww / 2);
        let centerY = (wh / 5) * 3;

        let ballX = centerX;
        let ballY = centerY;
        let vx = 0; 
        let vy = 0; 

        const fps = 25

        const damping = 0.7; 
        const stiffness = 0.4; 
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const gravity = 0.3; 


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
            const dist = Math.hypot(e.clientX - ballX, e.clientY - ballY);
            if (dist < radius) {
                isDragging = true;
            }
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

            if (isReleased) {
                setButtonPosition({ x: e.clientX, y: e.clientY});                
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
            hoopXCenter= (ww/ 4)*3
            hoopYCenter = wh/3

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
            hoopXCenter = (ww/ 4)*3
            hoopYCenter = wh/3
            vx = 0;
            vy = 0;

            setButtonPosition({ x: centerX, y: centerY+75});
        }

        // const drawDottedLine= (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, dotSize: number, gap: number) => {
        //     ctx.beginPath();
        //     ctx.setLineDash([dotSize, gap]);
        //     ctx.moveTo(startX, startY);
        //     ctx.lineTo(endX, endY);
        //     ctx.stroke();
        //     ctx.setLineDash([]); // Reset to solid line
        // }


        // const calculateBounceAngle = (x: number, y: number, vx: number, vy: number) => {
        //         if (x + radius > ww || x - radius < 0) {
        //         vx = -vx;
        //         }
        //         if (y + radius > wh || y - radius < 0) {
        //         vy = -vy;
        //         }
        //         return { vx, vy };
        //     }
        

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
                }

                ballX += vx;
                ballY += vy;


                // Hoop collision

                if (
                    ballX + radius > hoopXCenter-40 && ballX - radius < hoopXCenter+40 &&
                    ballY + radius > hoopYCenter+30 && ballY - radius < hoopYCenter+30
                ) { 
                    vx *= -damping
                    vy *= -damping
                    console.log('hoop')
                }

                // if (
                //     ballX + radius > hoopXTopLeft && ballX - radius < hoopXTopRight&&
                //     ballY + radius > hoopYTopLeft && ballY - radius < hoopYTopRight
                // ) { 
                //     vx *= -damping
                //     vy *= -damping
                //     console.log('hoop top left')
                // }

                //End Hoop collision

                if (ballY + radius > wh || ballY - radius < 0) {
                    vy *= -damping;
                    if (ballY + radius > wh ) ballY = wh - radius;
                    if (ballY - radius < 0) {
                        ballY = radius;
                    }
                }

                if (ballX + radius > ww|| ballX - radius < 0) {
                    vx *= -damping;
                    if (ballX + radius > ww) ballX = ww - radius;
                    if (ballX - radius < 0) {
                        ballX = radius;
                    }
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


            // const mirroredX = centerX - (ballX - centerX);
            // const mirroredY = centerY - (ballY - centerY);
            // drawDottedLine(ctx, ballX, ballY, mirroredX, mirroredY, 5, 5);
    
            // const { vx: bounceVx, vy: bounceVy } = calculateBounceAngle(mirroredX, mirroredY, vx, vy);
            // const bounceEndX = mirroredX + bounceVx * 10;
            // const bounceEndY = mirroredY + bounceVy * 10;
            // drawDottedLine(ctx, mirroredX, mirroredY, bounceEndX, bounceEndY, 5, 5);
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
            ctx.fill();


            // ctx.fillStyle = color
            // ctx.beginPath
            // ctx.rect(hoopX1,hoopY1, radius*2, radius/2)
            // ctx.fill();

            //Hoop drawing
            ctx.strokeStyle = color;
            ctx.beginPath
            ctx.moveTo(hoopXCenter+40,hoopYCenter)
            ctx.lineTo(hoopXCenter+40,hoopYCenter+30)
            // ctx.moveTo(hoopXTopLeft,hoopYTopLeft)
            // ctx.lineTo(hoopXBottomCenter,hoopYBottomCenter)
            ctx.stroke();

            ctx.strokeStyle = color;
            ctx.beginPath
            ctx.moveTo(hoopXCenter-40,hoopYCenter)
            ctx.lineTo(hoopXCenter-40,hoopYCenter+30)
            // ctx.moveTo(hoopXTopRight,hoopYTopRight)
            // ctx.lineTo(hoopXBottomCenter,hoopYBottomCenter)
            ctx.stroke();

            ctx.beginPath
            ctx.moveTo(hoopXCenter-40,hoopYCenter+30)
            ctx.lineTo(hoopXCenter+40,hoopYCenter+30)
            ctx.stroke()
            //hoop drawing end


            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener("resize", resizeScene);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        initscene();

        return () => {
            window.removeEventListener("resize", resizeScene);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [resetTrigger]);


    function resetScene() {
        setResetTrigger(prev => prev + 1);
        // window.location.reload();
    }

    return (
        <div>
            <h1>Ball</h1>

            <button className="resetButton"             
                style={{
                // left: buttonPosition.x-35, 
                // top: buttonPosition.y+70, 
                left: buttonPosition.x-35, 
                top: buttonPosition.y-25, 
                }}
            onMouseDown={resetScene}
            >
                <span className="material-symbols-outlined"
                style={{fontSize:'30px'}}
                >
                    refresh
                </span>
            </button>

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