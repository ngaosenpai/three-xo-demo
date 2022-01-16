import React, { useContext, useState } from 'react';
import { TurnContex } from "../context/turn"

function Cell({ cellX, cellY, color, trigger }) {
    
    const [changeColor, changing] = useState(false)
    // const [isYourTurn] = useContext(TurnContex)

    return (
        <mesh 
            receiveShadow={true}
            position={[cellX, cellY, 0]}
            onPointerEnter={(e) => {
                e.stopPropagation()
                // if(!e.object.userData.used){
                    changing(true)
                // }
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
                // console.log(isYourTurn)
                // if(isYourTurn){
                //     e.object.userData.used = true
                    trigger(cellX, cellY)
                // }
            }}
        >
            <boxGeometry args={[1,1, 0.5]} />
            <meshLambertMaterial color={!changeColor ? color : "red"} />
        </mesh>
    );
}

export default Cell;