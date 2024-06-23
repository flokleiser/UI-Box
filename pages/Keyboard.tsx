// //https://github.com/bobboteck/JoyStick?tab=readme-ov-file

// import React, { useState, useRef, useEffect, useReducer } from 'react';

// export default function Keyboard() {
//     const [position, setPosition] = useState({ x: 50, y: 50 }); 
//     const [initialPosition] = useState({ x: 50, y: 50 });
//     // const step = 15; 
//     const step = 0.5; 

//     const [direction, setDirection] = useState({ x: 0, y: 0 }); // Direction vector
//     const requestRef = useRef<number>();

//     const handleKeyDown = (event: KeyboardEvent) => {
//         const { key } = event;
//         // setPosition((prevPosition) => {
//         setDirection((prevDirection) => {
//             // let newPosition = { ...prevPosition };
//             let newDirection= { ...prevDirection};
//             if (key === 'w') {
//                 // newPosition.y = initialPosition.y - step;
//                 newDirection.y = -1
//             } else if (key === 'a') {
//                 // newPosition.x = initialPosition.x - step;
//                 newDirection.x = -1
//             } else if (key === 's') {
//                 // newPosition.y = initialPosition.y + step;
//                 newDirection.y = 1
//             } else if (key === 'd') {
//                 // newPosition.x = initialPosition.x + step;
//                 newDirection.x = 1
//             }
//             // return newPosition;
//             return newDirection;
//         });
//     };

//     const handleKeyUp = (event: KeyboardEvent) => {
//         const { key } = event;
//         setDirection((prevDirection) => {
//         let newDirection = { ...prevDirection}
//         if (key === 'w' || key === 's') {
//             newDirection.y = 0;
//         }
//         if (key === 'a' || key === 'd') {
//             newDirection.x = 0
//         }
//         return newDirection
//         })
//         // if (['w', 'a', 's', 'd'].includes(key)) {
//         //     setPosition(initialPosition);
//         // }
//     };

//     const animate = () => {
//         setPosition((prevPosition) => {
//             let newPosition = { ...prevPosition };
//             newPosition.x += direction.x * step;
//             newPosition.y += direction.y * step;
//             return newPosition;
//         });
//         requestRef.current = requestAnimationFrame(animate);
//     };

//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);
//         requestRef.current = requestAnimationFrame(animate);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//             cancelAnimationFrame(requestRef.current!)
//         };
//     }, [direction]);

//     return (
//         <div>
//             <h1>Keyboard</h1>
            
//             <div
//                 style={{
//                     position: 'absolute',
//                     width: '100px',
//                     height: '100px',
//                     backgroundColor: 'white',
//                     borderRadius: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     transition: 'left 0.1s, top 0.1s',
//                     left: `${position.x}%`,
//                     top: `${position.y}%`,
//                 }}
//             />
//                         <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
//                 <line
//                         x1={`${initialPosition.x}%`}
//                         y1={`${initialPosition.y}%`}
//                         x2={`${position.x}%`}
//                         y2={`${position.y}%`}
//                         stroke="white"
//                         strokeWidth="10"
//                         strokeLinecap='round'
//                     />
//             </svg>
//         </div>

//     );
// }


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
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.1s, top 0.1s', 
                }}
            />
        </div>
    );
}