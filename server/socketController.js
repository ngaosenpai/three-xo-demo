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

            const listSocket = Object.keys(data)
            const user = {
                name,
                color : listSocket.length === 0 ? "red" : "blue",
                text : listSocket.length === 0 ? "x" : "o"
            }
            data[socket.id] = user
            console.log(Object.keys(data))
            socket.emit("reply:set-user-name", user)


            if(Object.keys(data).length === 2){

                const firstTurn = Object.keys(data)[ getRandomInt(Object.keys(data).length) ]
                Object.keys(data).map(socketId => {
                    io.to(socketId).emit("start-match", { data , firstTurn})
                })
            }
            console.log(data)
        })

        socket.on("user-join-match", () => {
            // data[socket.id] = {}
        })

        socket.on("user-fire", ({x, y}) => {
            if(Object.keys(data).length === 2){
                const userName = data[socket.id].name
                const text = data[socket.id].text
                const color = data[socket.id].color
                Object.keys(data).map(socketId => {
                    io.to(socketId).emit("sync-user-fire", {x, y, userName, text, color})
                })
            }
        })

        // 
        socket.on("disconnect", () => {
            delete data[socket.id]
        })
    })
}