import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom"

const Home = () => {
    // TODO move to use redux vvv
    const socket = io("http://localhost:3001/", {transports: ["websocket"]})
    const navigate = useNavigate()

    socket.on(404, (msg) => {
        console.log(msg)
    })
    socket.on("join", (room) => {
        navigate(`/${room}`)
        // TODO update users -state in room
    })

    const handleCreate = () => {
        // create new room
        console.log("creating new room")
        console.log(socket.id)
        socket.emit("create")
        navigate(`/${socket.id}`)
    }

    const handleJoin = (event) => {
        event.preventDefault()
        const room = event.target.room.value
        console.log("joining room", room)
        socket.emit("join", room)
    }

    return (
        <div>
            <button onClick={handleCreate} name="create">create room</button>
            <form onSubmit={handleJoin}> 
                <button name="join" type="submit">join room</button>
                <input name="room"></input>
            </form>
            
        </div>
    )
}

export default Home