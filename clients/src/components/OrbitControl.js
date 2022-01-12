import React, { useEffect, useRef } from 'react';
import { OrbitControls } from "@react-three/drei"

function OrbitControl({ targetX, targetY }) {
    
    const orbit = useRef()

    useEffect(() => {
        orbit.current.target.x = targetX || 0
        orbit.current.target.y = targetY || 0
        console.log(orbit.current)
    }, []) 

    return (
        <OrbitControls ref={orbit} />
    );
}

export default OrbitControl;