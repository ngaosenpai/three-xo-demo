const data = {}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = function(io){
    io.on("connection", socket => {

        socket.on("get-number-of-user", () => {
            console.log(io.engine.clientsCount)
            socket.emit("number-of-user", io.engine.clientsCount)
        })

        socket.on("set-user-name", name => {
            socket.join("room1")
            const listSocket = Object.keys(data)
            const user = {
                name,
                color : listSocket.length === 0 ? "rgb(157, 2, 8)" : "rgb(3, 7, 30)",
                text : listSocket.length === 0 ? "x" : "o",
                refNumber : listSocket.length === 0 ? 1 : -1
            }
            data[String(socket.id)] = user
            console.log(Object.keys(data))
            socket.emit("reply:set-user-name", user)
            
            if(Object.keys(data).length === 2){
                io.to("room1").emit("start-match", data)
            }
        })
        
        socket.on("get-turn", () => {
            if(Object.keys(data).length === 2){
                const firstTurn = Object.keys(data)[ getRandomInt(Object.keys(data).length) ]
                io.to("room1").emit("set-first-turn", firstTurn)
            }
        })

        socket.on("got-win-player", winStatus => {
            console.log(winStatus)
            io.to("room1").emit("win", winStatus)
            
      
        })

        socket.on("user-fire", ({x, y}) => {
            if(Object.keys(data).length === 2){
                const userName = data[socket.id].name
                const text = data[socket.id].text
                const color = data[socket.id].color
                const refNumber = data[socket.id].refNumber
                
                io.to("room1").emit("sync-user-fire", {x, y, userName, refNumber, text, color})
                
            }
        })

        // 
        socket.on("disconnect", () => {
            delete data[socket.id]
        })
    })
}