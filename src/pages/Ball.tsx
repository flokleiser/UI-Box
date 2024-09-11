import React, { useEffect, useState, useRef } from 'react';
import {motion} from 'framer-motion'
import { startPage } from '../components/Window';

export default function Ball() {
    const [resetTrigger, setResetTrigger] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const navbar = document.querySelector('#navbarRoot') as HTMLElement;
    useEffect(() => {

        const canvasBall= canvasRef.current as HTMLCanvasElement;
        const ctx = canvasBall.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
        const mouse = { x: 0, y: 0 };
        const radius = 25;
        let isDragging = false;
        let isReleased = false; 
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = (ww / 2);
        let centerY = (wh / 5) * 3;
        let ballX = centerX;
        let ballY = centerY;
        let vx = 0; 
        let vy = 0; 
        // let clicks = startPage === 'Ball' ? 1 : 0;
        let clicks = 1 
        const damping = 0.7; 
        const stiffness = 0.4; 
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const gravity = 0.3; 
        let currentIndex = 0
        // let insideHoop = false;

        let hoop = true;
        // let hoop = false;
        let animationFrameId: number;

        const randomizerButton = document.getElementById('randomizerButton');
        const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
        const hoopButton = document.getElementById('hoopButton');

        const buttonDiv = document.getElementById('buttonDeadZone') as HTMLDivElement
        const buttonDivRect = buttonDiv.getBoundingClientRect()
        const deadZonePadding = 0

        let insideHoopCounter = 0;

        function resetHoopCounter() {
            insideHoopCounter = 0
        }

        const hoopCoordinates= [
            {x: ww/1.5, y: wh/3},
            {x: ww/3, y: wh/3},
            {x: ww/1.5, y: wh/1.5},
            {x: ww/3, y: wh/1.5},
            {x:ww/1.5, y: wh/2},
            {x:ww/3, y: wh/2},
            {x: ww/2, y: wh/2},
        ]
        const randomOrSequential = (mode: 'sequential' | 'random') => {
            let coords;
        
            if (mode === 'sequential') {
                coords = hoopCoordinates[currentIndex];
                currentIndex = (currentIndex + 1) % hoopCoordinates.length;
            } else {
                const randomIndex = Math.floor(Math.random() * hoopCoordinates.length);
                coords = hoopCoordinates[randomIndex];
            }
        
            return coords;
        };

        // let hoop = false;

        class Hoop {
            centerX: number;
            centerY: number;
            width: number;
            height: number;
            color: string;
        
            constructor(centerX: number, centerY: number, width: number, height: number, color: string) {
                this.centerX = centerX;
                this.centerY = centerY;
                this.width = width;
                this.height = height;
                this.color = color;
            }
        
            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.rect(this.centerX , this.centerY, this.width,this.height);
                ctx.fill();
            }
        }

        const hoopLeft = new Hoop(((canvasBall.width/4)*3), canvasBall.height /3,10,50, color);
        const hoopRight= new Hoop(((canvasBall.width/4)*3), canvasBall.height /3, 10,50, color);
        const hoopBottom = new Hoop(((canvasBall.width/4)*3), (canvasBall.height /3) + 50, 100,10, color);

        function checkCollision(ballX:number,ballY:number,radius:number,rect:Hoop): boolean {
          const distX = Math.abs(ballX - rect.centerX - rect.width / 2);
          const distY = Math.abs(ballY - rect.centerY - rect.height / 2);
      
          if (distX > (rect.width / 2 + radius)) { return false; }
          if (distY > (rect.height / 2 + radius)) { return false; }
      
          if (distX <= (rect.width / 2)) { return true; }
          if (distY <= (rect.height / 2)) { return true; }
      
          const dx = distX - rect.width / 2;
          const dy = distY - rect.height / 2;
          return (dx * dx + dy * dy <= (radius * radius));
        }

        //mouse events
        const onMouseMove = (e:MouseEvent) => {
            const target = e.target as HTMLElement;
            if (buttonDiv?.contains(target) 
            ) {
                // console.log('deadzone onMouseMove')
                return
            }
            if (clicks > 1) {
                if (isDragging) {
                    mouse.x = e.clientX;
                    mouse.y = e.clientY;
                    ballX = mouse.x;
                    ballY = mouse.y;
                }
            }
        };
        const onTouchMove = (e:TouchEvent) => {
            if (clicks > 1) {
                if (e.touches.length > 0 && isDragging) {
                    mouse.x = e.touches[0].clientX;
                    mouse.y = e.touches[0].clientY;
                    ballX = mouse.x;
                    ballY = mouse.y;
                }
            }
        };
        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
       
            }
        };
        const onMouseDown = (e:MouseEvent) => {

            const target = e.target as HTMLElement;
            if (buttonDiv?.contains(target)) {
                return
            }
            centerX = e.clientX
            centerY = e.clientY
            IncreaseClicks()

            // if (clicks < 1) {
                // console.log('first click')
            // }

            if (clicks > 1) {
                if (e.clientY + radius > wh|| e.clientY- radius < 0 + navbar.offsetHeight) {
                    ballX = ww/2
                    ballY = wh/2
                }
                else {
                    ballX = centerX
                    ballY = centerY
                }
            }

            vx = 0
            vy = 0

            isDragging = true;
            isReleased = false;
        };
        const onMouseUp = (e:MouseEvent) => {
            if (clicks > 1) {
             
                if (isDragging) {
                    isDragging = false;
                    const dx = ballX - centerX;
                    const dy = ballY - centerY;
                    vx = -dx * 0.1;
                    vy = -dy * 0.1; 
                    isReleased = true;
                }
            }
        };

        //init scene
        const initscene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            isDragging = false;
            isReleased = false; 
            centerX = ww / 2;
            centerY = (wh / 5) * 3;
            ballX = centerX;
            ballY = centerY;
            randomizeHoop('sequential')


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
            hoopLeft.centerX = ((ww / 4) * 3) + 45;
            hoopLeft.centerY = wh / 3;
            hoopRight.centerX = ((ww / 4) * 3) - 45;
            hoopRight.centerY = wh / 3;
            hoopBottom.centerX = ((ww / 4) * 3) - 45;
            hoopBottom.centerY = (wh / 3) + 50;

        }
        const randomizeHoop = (mode: 'sequential' | 'random') => {
            console.log('randomizing hoop');
            const { x, y } = randomOrSequential(mode);
        
            hoopLeft.centerX = x + 45;
            hoopLeft.centerY = y;
        
            hoopRight.centerX = x - 45;
            hoopRight.centerY = y;
        
            hoopBottom.centerX = x - 45;
            hoopBottom.centerY = y + 50;
        };
        const toggleHoop = () => {
            hoop = !hoop;
            console.log('hoop', hoop)
        }

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

            if (hoop) {
                if (checkCollision(ballX, ballY, radius, hoopLeft)) {
                  if (ballX < hoopLeft.centerX) {
                      ballX = hoopLeft.centerX - radius;
                      vx *= -damping;
                  } else {
                      ballX = hoopLeft.centerX + hoopLeft.width + radius;
                      vx *= -damping;
                  }
              }
      
              if (checkCollision(ballX, ballY, radius, hoopRight)) {
                  if (ballX < hoopRight.centerX) {
                      ballX = hoopRight.centerX - radius;
                      vx *= -damping;
                  } else {
                      ballX = hoopRight.centerX + hoopRight.width + radius;
                      vx *= -damping;
                  }
              }
            
      
              if (checkCollision(ballX, ballY, radius, hoopBottom)) {

                  if (ballY < hoopBottom.centerY) {
                      ballY = hoopBottom.centerY - radius;
                      vy *= -damping;
                  } else {
                      ballY = hoopBottom.centerY + hoopBottom.height + radius;
                      vy *= -damping;
                  }
              }
            }


            //inside hoop check
            if (ballX + radius > hoopRight.centerX && ballX - radius < hoopLeft.centerX && 
                ballY + radius < hoopBottom.centerY + hoopBottom.height
                && ballY + radius > hoopBottom.centerY - hoopRight.height) {

                    // setInsideHoop()
                    // console.log('inside hoop', insideHoop)
                    insideHoopCounter += 1

                    vx *= 0.9
                    vy *= 0.98

                    if (insideHoopCounter > 100) {
                        console.log('test')
                        resetHoopCounter()

                        randomizeHoop('sequential') 

                    }


            }

                //canvascollision
                if (ballY + radius > wh|| ballY - radius < 0 + navbar.offsetHeight) {
                    vy *= -damping;
                    if (ballY + radius > wh) ballY = wh - radius;
                    if (ballY - radius < 0 + navbar.offsetHeight) {
                        ballY = navbar.offsetHeight + radius;
                    }
                }
                if (ballX + radius > ww|| ballX - radius < 0) {
                    vx *= -damping;
                    if (ballX + radius > ww) ballX = ww - radius;
                    if (ballX - radius < 0) ballX = radius;
                }

            }

            /* collision while dragging */
            if (isDragging) {
                if (ballY + radius > wh|| ballY - radius < 0) {
                        vy *= -damping;
                        if (ballY + radius > wh) {
                            ballY = wh - radius;
                        }

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
                    vx = 0;
                    vy = 0;
                }


            ctx.clearRect(0, 0, canvasBall.width, canvasBall.height);

            if (!isReleased) {
                if (centerY + radius > wh|| centerY - radius < 0 + navbar.offsetHeight) {
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(ballX, ballY);
                }
                else {
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 10;
                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(ballX, ballY);
                    ctx.stroke();
                }
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
            ctx.fill();

            if (hoop) {
                hoopLeft.draw(ctx);
                hoopRight.draw(ctx)
                hoopBottom.draw(ctx);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const handleThemeToggle = () => {resetScene()}
        window.addEventListener("resize", resizeScene);


        function IncreaseClicks() {
            clicks += 1
        }

        //buttons
        if (randomizerButton) {
            randomizerButton.addEventListener('click', () => {
                randomizeHoop('sequential')
            })
        }
        if (darkmodeToggleButton) {
            darkmodeToggleButton.addEventListener('click', handleThemeToggle);
        }
        if (hoopButton) {
            hoopButton.addEventListener('click', toggleHoop);
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
            if (randomizerButton) {
                randomizerButton.removeEventListener('click', () => {
                    randomizeHoop('sequential')
                })
            }
            if (hoopButton) {
                hoopButton.removeEventListener('click', toggleHoop);
            }

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
    }



    return (
        <div className="bodyCenter">
        <div>

        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
            <h1>Ball</h1>

            <div style={{display: 'flex', flexDirection: 'row'}} id='buttonDeadZone'>

            <motion.button className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', 
            // padding:'15px'
            }} 
            id="randomizerButton" 
            whileHover={{rotate:180}}
            >
                <span className="material-symbols-outlined">
                    swap_horiz
                </span>
            </motion.button>

            <motion.button className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', 
            // padding:'15px'
        }} 
            id="hoopButton" 
            whileHover={{rotate:180}}
            >
                <span className="material-symbols-outlined">
                    orders
                </span>
            </motion.button>

            </div>
            </div>

            <canvas ref={canvasRef}
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top:0,
                    left: 0,
                    overflow: 'hidden',
                    zIndex: -10
                }}
                id="sceneBall">
            </canvas>
        </div>
        </div>
    );
}