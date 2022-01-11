import React from 'react';

function Point({ text, x, y }) {
    
    return (
        <mesh position={[x, y, 0.7]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} /> :
            <meshLambertMaterial color={text === "x" ? "red" : "blue"} />
        </mesh>
    );
}

export default Point;