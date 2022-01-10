import React from 'react';

function Cell({ cellX, cellY, color }) {
    return (
        <mesh position={[cellX, cellY, 0]}>
            <boxGeometry args={[1,1, 0.5]} />
            <meshBasicMaterial color={color} />
        </mesh>
    );
}

export default Cell;