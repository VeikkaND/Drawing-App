const express = require("express")
const cors = require("cors")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
app.use(cors())
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173/"
    }
})

const port = 3001

httpServer.listen(port)


io.on("connection", (socket) => {
    socket.on("create", () => {
        socket.join(socket.id)
        console.log("room created", socket.id)
        console.log(io.sockets.adapter.rooms)
    })
    socket.on("join", (room) => {
        const rooms = io.sockets.adapter.rooms
        if(rooms.has(room)) {
            socket.join(room)
            console.log("joining room", room)
            socket.emit("join", room)
        } else {
            socket.emit(404, "room not found")
            console.log("room not found", room)
        }
    })
})