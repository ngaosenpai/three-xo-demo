import './App.css';
import { useEffect, useState } from "react"

import { Canvas } from "@react-three/fiber"


import Group from './components/Group';
import Camera from "./components/Camera"
import OrbitControl from './components/OrbitControl';
import Modal from './components/Modal';
import { Text } from "@react-three/drei"

import { socket } from "./context/socket"

function App() {

  const [cameraPosition, setCamPos] = useState(null)
  const boardSize = 6



  // re center the camera to the center of board
  useEffect(() => {
    // console.log(board)
    setCamPos([boardSize/2, boardSize/2])
  }, [])

  const [userName, setName] = useState("")
  const [isGameAvailable, setGameAvailable] = useState(false)
  const [sendName, setSendName] = useState(false)

  // match state
  const [match, setMatch] = useState({
    shouldStart : false,
    shouldJoin : false,
    name : undefined,
    color : undefined,

  })

  const [matchTitle, setMatchTitle] = useState("")

  // initial
  useEffect(() => {
    socket.on("number-of-user", (noUser) => {
      setGameAvailable(noUser <= 2)

    })
    
    socket.on("reply:set-user-name", user => {
      console.log(user)
      setMatch(prev => ({
        ...prev,
        name : user.name,
        color : user.color,
        shouldJoin: true
      }))
    })

    socket.on("start-match", (data) => {

      setMatch(prev => {
        const opponentId = Object.keys(data).find(key => data[key].name !== prev.name)
        const title = `You Vs ${data[opponentId].name}`
        setMatchTitle(title)

        return {
          ...prev,
          shouldStart: true
        }
      })
    })


    socket.emit("get-number-of-user")
  }, [])

  useEffect(() => {
    if(sendName){
      console.log("name: ", userName)
      socket.emit("set-user-name", userName)
    }
  }, [sendName])

  useEffect(() => {
    if(isGameAvailable){
      // join game
      socket.emit("user-join-match")
    }
  }, [isGameAvailable])

  useEffect(() => {
    console.log(matchTitle)
  }, [matchTitle])

  return (
      <div className="App">
        {
          !isGameAvailable && <h2>Sorry game is not available now</h2>
        }
        {
          isGameAvailable && match.shouldJoin &&
          <>
            {
              !match.shouldStart && <Modal />
            }
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
              {
                matchTitle && 
                <Text scale={[10, 10, 10]} position={[2, 5, -5]} color={"green"} >{matchTitle}</Text>
              }
              <Group size={boardSize} />
            </Canvas> 
          </>
        }
        {
          isGameAvailable && !match.shouldJoin &&
          <>
            <input disabled={sendName} placeholder='Enter your name' onChange={e => {
              setName(prev => e.target.value)
            }}  />
            <button disabled={sendName} onClick={() => setSendName(true)}>Play!</button>
          </>
        }
      </div>
  );
}

export default App;
