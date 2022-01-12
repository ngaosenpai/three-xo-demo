import React, { useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import Point from './Point';

const BLACK = "black"
const WHITE = "rgb(233, 237, 201)"

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

    let Matrix = null
    // state data
    const [board, setBoard] = useState(null)
    const [points, addPoint] = useState([])

    const gr = useRef()
    
    const trigger = (x, y, owner) => {
        addPoint(prev => [
            ...prev, 
            <Point 
                text="x" 
                key={`${x}-${y}`} 
                x={x} 
                y={y}
            />
        ])
        Matrix[x][y].user = owner
    }

    useEffect(() => {
        gr.current.rotation.x = -1
        const [board, referMatrix] = generateBoardAndMatrix(size, trigger)
        setBoard(board)
        Matrix = referMatrix
    }, [])

    useEffect(() => {
        console.log(gr.current)
    }, [])

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