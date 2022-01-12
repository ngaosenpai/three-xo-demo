import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"


import Cell from "./components/Cell"
import Group from './components/Group';
import Camera from "./components/Camera"
import Point from './components/Point';
import OrbitControl from './components/OrbitControl';










function App() {


  
  const [cameraPosition, setCamPos] = useState(null)
  const boardSize = 6

  


  // re center the camera to the center of board
  useEffect(() => {
    // console.log(board)
    setCamPos([boardSize/2, boardSize/2])

  }, [])


  // // map point
  // useEffect(() => {

  // }, [referMatrix])
  

  return (
    <div className="App">
      <Canvas
        // onCreated={state => {
        //   console.log(state)
        //   state.scene.background = "white"
        // }}
      >
        <OrbitControl targetX={boardSize/2} targetY={boardSize/2} />
        <Camera cameraPosition={cameraPosition} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Group size={boardSize} />
        
        {/* <mesh position={[-5, 0, 0]} >
          <boxGeometry args={[5,5,5]} />
          <meshBasicMaterial />
        </mesh> */}

        {/* <Text
          scale={[10, 10, 10]}
          color="black" // default
          anchorX="center" // default
          anchorY="middle" // default
        >
          HELLO WORLD
        </Text> */}
      
      </Canvas>
    </div>
  );
}

export default App;
