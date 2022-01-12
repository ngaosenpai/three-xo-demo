import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { SocketContext } from "./context/socket"
import { TurnContex, useTurn } from "./context/turn"

// console.log(socket)

function AppWrapper(props) {
  // const [isYourTurn, initialTurn, changeTurn, setTurn] = useTurn()
  const [isYourTurn, setTurn] = useState(false)
  return (
    <TurnContex.Provider value={[isYourTurn, setTurn]}>
      <App />
    </TurnContex.Provider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    {/* <SocketContext.Provider value={socket}> */}
    
      <AppWrapper />

    
    {/* </SocketContext.Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

