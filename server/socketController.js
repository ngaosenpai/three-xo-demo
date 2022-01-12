const data = {}

module.exports = function(io){
    io.on("connection", socket => {

        socket.on("get-number-of-user", () => {
            console.log(io.engine.clientsCount)
            socket.emit("number-of-user", io.engine.clientsCount)
        })

        socket.on("set-user-name", name => {
            const user = {
                name,
                color : Object.keys(data).length === 0 ? "red" : "blue"
            }
            data[socket.id] = user
            console.log(Object.keys(data))
            socket.emit("reply:set-user-name", user)
            if(Object.keys(data).length === 2){
                Object.keys(data).map(socketId => {
                    io.to(socketId).emit("start-match", data)
                })
            }
            console.log(data)
        })

        socket.on("user-join-match", () => {
            // data[socket.id] = {}
        })


        // 
        socket.on("disconnect", () => {
            delete data[socket.id]
        })
    })
}