import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"

import { Canvas, useThree } from "@react-three/fiber"

import Cell from "./components/Cell"

const BLACK = "black"
const WHITE = "blue"


function Camera() {
  const { camera } = useThree()

  // can not change the position but can modify its value
  camera.position.z = 50
  camera.position.x = 25
  camera.position.y = 25


  useEffect(() => { console.log(camera) }, [])
  return <perspectiveCamera/>
} 


const generateBoardFromMatrix = size => {
  const board = []



  for(let row = 0; row < size; row++){

    for(let colum = 0; colum < size; colum++){

      board.push(
        <Cell 
          key={`${row}-${colum}`}
          cellX={row} 
          cellY={colum} 
          color = {(row%2 + colum%2)%2 === 1 ? BLACK : WHITE}
        />
      )
    }
  }
  return board
}

function App() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    setBoard(generateBoardFromMatrix(50))
  }, [])

  // useEffect(() => {
  //   console.log(board)
  // }, [board])

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
