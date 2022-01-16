import React, { useEffect, useState } from 'react';
import { Text } from "@react-three/drei"
import { socket } from "../context/socket"
// import { turn } from "../context/turn"

function TurnText(props) {
    const [winTitle, setWinTitle] = useState("")
    useEffect(() => {
        socket.on("win", winStatus => {
            setWinTitle(`${winStatus.user} won!!!`)
        })
       
    }, [])
    return (
        <>{
            winTitle && 
            <Text scale={[10, 10, 10]} position={[-3, 0, 0]} color={"blue"} >
                {winTitle}
            </Text>
        }</>
    );
}

export default TurnText;