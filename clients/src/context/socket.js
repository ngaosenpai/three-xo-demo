import React, { createContext } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:4000")
// console.log(socket)

const SocketContext = createContext(null)

export {
    socket, 
    SocketContext
}