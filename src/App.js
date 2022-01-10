import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"

import { Canvas, useThree } from "@react-three/fiber"

import Cell from "./components/Cell"




function Camera() {
  const { camera } = useThree()

  // can not change the position but can modify its value
  camera.position.z = 20

  useEffect(() => { console.log(camera) }, [])
  return <perspectiveCamera/>
} 

const generateMatrix = (size) => {
  const matrix = []
  let count = 1
  for(let row = 0; row < size; row++){
    let list = []
    for(let colum = 0; colum < size; colum++){
      list.push(count++)
    }
    matrix.push(list)
  }
  return matrix
}

const generateBoardFromMatrix = matrix => {
  const board = []
  for(let rowIndex in matrix){
    for(let columIndex in matrix[rowIndex]){
      board.push(
        <Cell 
          key={matrix[rowIndex][columIndex]}
          cellX={rowIndex} 
          cellY={columIndex} 
          cellValue={matrix[rowIndex][columIndex]} 
        />
      )
    }
  }
  return board
}

function App() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    setBoard(generateBoardFromMatrix(generateMatrix(6)))
  }, [])

  useEffect(() => {
    console.log(board)
  }, [board])

  return (
    <div className="App">
      <Canvas
        // onCreated={state => {
        //   console.log(state)
        //   state.scene.background = "white"
        // }}
      >
        <Camera />
  
        {
          board
        }
        
      </Canvas>
    </div>
  );
}

export default App;
