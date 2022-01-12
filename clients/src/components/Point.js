import React from 'react';

function Point({ text, x, y, color }) {
    
    return (
        <mesh position={[x, y, 0.7]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} /> :
            <meshLambertMaterial color={color} />
        </mesh>
    );
}

export default Point;