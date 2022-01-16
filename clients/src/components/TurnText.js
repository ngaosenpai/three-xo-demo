import React, { useEffect, useState, memo } from 'react';
import { Text } from "@react-three/drei"
import { socket } from "../context/socket"
import { turn } from "../context/turn"
// import { turn } from "../context/turn"

function TurnText(props) {
    const [isYourTurn, changeTurn] = useState(false)
    useEffect(() => {
        socket.on("sync-user-fire", () => {
            changeTurn(prev => !prev)
        })
        socket.on("set-first-turn", firstTurn => {
            console.log(socket.id, firstTurn, socket.id === firstTurn)
            changeTurn(prev => socket.id === firstTurn)
          })
        socket.on("win", () => {
            changeTurn(prev => false)
            turn[0].isYourTurn = false
        })

        socket.emit("get-turn")
        console.log("re render Turn Text and useeffect")
    }, [])
    return (
        <>{
             
            <Text scale={[10, 10, 10]} position={[-3, 0, 0]} color={"blue"} >
                { isYourTurn ? "Your Turn" : ""}
            </Text>
        }</>
    );
}

export default memo(TurnText, () => true);