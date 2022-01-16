import { useFBX } from '@react-three/drei';
import React, { useContext, useEffect, useRef, useState, memo, Suspense } from 'react';
import { socket } from "../context/socket"
import { turn } from "../context/turn"
import { checkWin } from "../utils/matrix"

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
    // const [isYourTurn, setTurn] = useContext(TurnContex)
    // state data
    const [board, setBoard] = useState(null)
    const [points, addPoint] = useState([
        // <Point  text="x" x={0} y ={0} color={"rgb(157, 2, 8)"} />,
        // <Point  text="o" x={0} y ={1} color={"rgb(3, 7, 30)"}/>
    ])
    // const [isYourTurn, setTurn] = useState(isFirst)
    const gr = useRef()
    

    const trigger = (x, y) => {
        // console.log("isYourTurn", isYourTurn)
        if(!Matrix[x][y].user && turn[0].isYourTurn){
            socket.emit("user-fire", { x, y })
        }
    }
    
    const XModel = useFBX("X.fbx")
    const OModel = useFBX("O.fbx")
    XModel.castShadow = true
    OModel.castShadow = true

    useEffect(() => {
        // initial 
        gr.current.rotation.x = -1
        const [board, referMatrix] = generateBoardAndMatrix(size, trigger)
        setBoard(board)
        Matrix = referMatrix
        // setTurn(prev => isFirst)

        // socket event handler
        socket.on("sync-user-fire", ({x, y, userName, refNumber, text, color}) => {
            addPoint(prev => [
                ...prev, 
                <Point 
                    model={text === "x" ? XModel : OModel}
                    text={text}
                    key={`${x}-${y}`} 
                    x={x} 
                    y={y}
                    color={color}
                />
            ])
            Matrix[x][y].user = userName
            Matrix[x][y].refNumber = refNumber
            // setTurn(prev => !prev)
            turn[0].isYourTurn = !turn[0].isYourTurn
            const winStatus = checkWin(Matrix, x, y, 3)
            console.log(winStatus)
            if(winStatus.isWin){
                socket.emit("got-win-player", winStatus)
            }

            // console.log(Matrix)
        })
       
    }, [])

    // useEffect(() => {
    //     console.log("turn ", isYourTurn)
    // }, [isYourTurn])

    return (
        
        <group ref={gr} castShadow={true} receiveShadow={true}>
        {
            board
        }
        
        {
            points
        }
        
        </group>
        
    );
}

function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */ 
//    console.log(prevProps, nextProps, prevProps === nextProps)
   return prevProps.size === nextProps.size
}

export default memo(Group, areEqual);