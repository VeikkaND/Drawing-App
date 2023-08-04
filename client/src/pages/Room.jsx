import { useState } from "react"
import { useParams } from "react-router-dom"

const Room = () => {
    const {room} = useParams()
    const [users, setUsers] = useState([room])

    return(
        <div>
            <h1>room {room}</h1>
            current users: {users.map(user => <p key={user}>{user}</p>)}
        </div>
    )
}

export default Room