import React, { useState } from 'react';

function Cell({ cellX, cellY, color, trigger }) {
    
    const [changeColor, changing] = useState(false)

    return (
        <mesh 
            position={[cellX, cellY, 0]}
            onPointerEnter={(e) => {
                e.stopPropagation()
                if(!e.object.userData.used){
                    changing(true)
                }
            }}
            onPointerLeave={(e) => {
                e.stopPropagation()
                if(changeColor){
                    changing(false)
                }
            }}

            // save the user data here (after they click to put their point)
            onClick={(e) => {
                e.stopPropagation()
                if(!e.object.userData.used){
                    e.object.userData.used = true
                    trigger(cellX, cellY, "test")
                }
            }}
        >
            <boxGeometry args={[1,1, 0.5]} />
            <meshLambertMaterial color={!changeColor ? color : "red"} />
        </mesh>
    );
}

export default Cell;