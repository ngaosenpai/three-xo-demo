import './App.css';
import { Suspense, useContext, useEffect, useState } from "react"

import { Canvas } from "@react-three/fiber"


import Group from './components/Group';
import Camera from "./components/Camera"
import OrbitControl from './components/OrbitControl';
import Modal from './components/Modal';
import { Text, useContextBridge } from "@react-three/drei"

import { socket } from "./context/socket"
import { TurnContex, turn } from "./context/turn"
import TurnText from './components/TurnText';
import WinText from "./components/WinText"
import Point from './components/Point';

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
    text: undefined,
    matchData : null,
    // firstTurn : undefined
  })

  const [matchTitle, setMatchTitle] = useState(undefined)



  // const [isYourTurn, setTurn] = useContext(TurnContex)

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
        text : user.text,
        shouldJoin: true
      }))
    })

    socket.on("start-match", (data) => {
      console.log(data)
      setMatch(prev => {
        return {
          ...prev,
          // shouldStart: true,
          matchData : data,
    
        }
      })
    })
  
    socket.on("set-first-turn", firstTurn => {
      turn[0].isYourTurn = socket.id === firstTurn
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
    if(match.matchData){
      const { matchData : data } = match
      
      const opponentId = Object.keys(data)
      .find(key => data[key].name !== match.name)
      const title = `You Vs ${data[opponentId].name}`
      setMatchTitle(title)
      // setTurn(data[firstTurn].name === match.name)
      // turn[0].isYourTurn = data[firstTurn].name === match.name
    }
  }, [match.matchData])

  useEffect(() => {
    if(matchTitle){
      console.log(matchTitle)
      setMatch(prev => ({
        ...prev,
        shouldStart: true
      }))

    }
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
              shadows={true}
              shadowMap
              // onCreated={state => {
              //   console.log(state)
              //   state.scene.background = "white"
              // }}
            >
              <OrbitControl targetX={boardSize/2} targetY={boardSize/2} />
              <Camera cameraPosition={cameraPosition} />
              <directionalLight intensity={0.5} castShadow={true} />
              <ambientLight intensity={0.5} />
              {
                matchTitle && 
                <Text scale={[10, 10, 10]} position={[2, 5, -5]} color={"green"} >{matchTitle}</Text>
              }
              <TurnText />
              <WinText />

              <Suspense fallback={null}>
              <Group 
                size={boardSize} 
              />
              </Suspense>
              {/* <Suspense fallback={null}>

                <Point  text="x" x={0} y ={0} />
                <Point  text="x" x={1} y={1} />
              </Suspense> */}

             


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
