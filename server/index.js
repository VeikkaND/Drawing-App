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
        console.log("rooms", io.sockets.adapter.rooms)
    })
    socket.on("join", (room) => {
        const rooms = io.sockets.adapter.rooms
        console.log("rooms", rooms)
        if(rooms.has(room)) {
            socket.join(room)
            console.log("joining room", room)
            socket.emit("join", room)

            // refresh users for new client in room
            socket.emit("reloadUsers", Array.from(io.sockets.adapter.rooms.get(room)))
            // refresh users for all client in room
            socket.to(room).emit("reloadUsers", Array.from(io.sockets.adapter.rooms.get(room)))
        } else {
            socket.emit(404, "room not found")
            console.log("room not found", room)
        }
    })
    socket.on("draw", (info) => {
        const rooms = io.sockets.adapter.rooms
        if(rooms.has(info.room)) {
            socket.to(info.room).emit("draw", {
                lineToX: info.lineToX, 
                lineToY: info.lineToY,
                lineWidth: info.lineWidth
            })
        }
    })
    socket.on("stop", (room) => {
        socket.to(room).emit("stop")
    })
})