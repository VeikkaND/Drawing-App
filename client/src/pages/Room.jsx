import { useState } from "react"
import { useParams } from "react-router-dom"
import socket from "../socket"
import DrawingCanvas from "../components/DrawingCanvas"

const Room = () => {
    const {room} = useParams()
    const [users, setUsers] = useState([room])
    // todo fix name disappearing when refreshing

    socket.on("reloadUsers", (users) => {
        setUsers(users)
    })

    return(
        <div>
            <h1>room {room}</h1>
            current users: {users.map(user => <p key={user}>{user}</p>)}
            <DrawingCanvas />
        </div>
    )
}

export default Room