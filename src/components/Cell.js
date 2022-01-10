import React from 'react';

function Cell({ cellX, cellY, cellValue }) {

    console.log(cellX, cellY, cellValue, parseInt(cellValue)%2 === 0)
    return (
        <mesh position={[parseInt(cellX), parseInt(cellY), 0]}>
            <boxGeometry args={[1,1, 0.5]} />
            <meshBasicMaterial color={parseInt(cellValue)%2 === 0 ? "black" : "rgb(221, 190, 169)"} />
        </mesh>
    );
}

export default Cell;