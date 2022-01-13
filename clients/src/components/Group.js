import React, { useContext, useEffect, useRef, useState } from 'react';
import { socket } from "../context/socket"
import { TurnContex } from "../context/turn"

import Cell from './Cell';
import Point from './Point';

const BLACK = "black"
const WHITE = "rgb(233, 237, 201)"
let Matrix = null


const generateBoardAndMatrix = (size, trigger) => {
    const board = []
    const referMatrix = []
  
    for(let row = 0; row < size; row++){
      const rowList = []
      for(let colum = 0; colum < size; colum++){
        rowList.push({})
        board.push(
          <Cell 
            key={`${row}-${colum}`}
            cellX={row} 
            cellY={colum} 
            color = {(row%2 + colum%2)%2 === 1 ? BLACK : WHITE}
            trigger={trigger}
          />
        )
      }
      referMatrix.push(rowList)
    }
    return [board, referMatrix]
}




function Group({ size }) {

    // const socket = useContext(SocketContext)
    // console.log(socket)
    const [isYourTurn, setTurn] = useContext(TurnContex)
    // state data
    const [board, setBoard] = useState(null)
    const [points, addPoint] = useState([])
    // const [isYourTurn, setTurn] = useState(isFirst)
    const gr = useRef()
    

    const trigger = (x, y) => {
        // console.log("isYourTurn", isYourTurn)
        if(!Matrix[x][y].user){
            socket.emit("user-fire", { x, y })
        }
    }

    

    useEffect(() => {
        // initial 
        gr.current.rotation.x = -1
        const [board, referMatrix] = generateBoardAndMatrix(size, trigger)
        setBoard(board)
        Matrix = referMatrix
        // setTurn(prev => isFirst)

        // socket event handler
        socket.on("sync-user-fire", ({x, y, userName, text, color}) => {
            addPoint(prev => [
                ...prev, 
                <Point 
                    text={text}
                    key={`${x}-${y}`} 
                    x={x} 
                    y={y}
                    color={color}
                />
            ])
            Matrix[x][y].user = userName
            setTurn(prev => !prev)

            console.log(Matrix)
        })
       
    }, [])

    useEffect(() => {
        console.log("turn ", isYourTurn)
    }, [isYourTurn])

    return (
        <group ref={gr}>
        {
            board
        }
        {
            points
        }
        </group>
    );
}

export default Group;