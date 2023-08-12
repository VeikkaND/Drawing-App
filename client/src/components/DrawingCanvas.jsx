import { useEffect, useRef, useState } from "react"
import socket from "../socket"

const DrawingCanvas = ({room}) => {
    const [canvasState, setCanvasState] = useState(null)
    const [update, setUpdate] = useState(true)
    const canvasRef = useRef(null)

    useEffect(() => {
        setUpdate(false)
    }, [])

    useEffect(() => {
        // TODO fix drawing not sohwing up after going back to previous tab
        socket.on("draw", (info) => {
            const ctx = canvasRef.current.getContext("2d")
    
            ctx.lineWidth = info.lineWidth
            ctx.lineTo(info.lineToX, info.lineToY)
            ctx.stroke()
        })
        socket.on("stop", () => {
            const ctx = canvasRef.current.getContext("2d")

            ctx.stroke()
            ctx.beginPath()
        })
    }, [update])

    let painting = false
    let lineWidth = 4
    let startX
    let startY

    const startDraw = (event) => {
        painting = true
        startX = event.clientX
        startY = event.clientY
    }

    const draw = (event) => {
        if(painting) {
            const canvas = event.target
            const ctx = canvas.getContext("2d")

            ctx.lineWidth = lineWidth
            const lineToX = event.clientX - canvas.offsetLeft
            const lineToY = event.clientY - canvas.offsetTop

            ctx.lineTo(lineToX, lineToY)
            ctx.stroke()
            
            socket.emit("draw", {
                room: room, 
                lineToX: lineToX, 
                lineToY: lineToY,
                lineWidth: lineWidth
            })
        }
    }

    const stopDraw = (event) => {
        painting = false
        const canvas = event.target
        const ctx = canvas.getContext("2d")

        ctx.stroke()
        ctx.beginPath()

        socket.emit("stop", room)
    }

    const canvasStyle = {
        "border": "1px solid"
    }

    return (
        <div>
            <canvas className="canvas"
                onMouseDown={startDraw} 
                onMouseMove={draw} 
                onMouseUp={stopDraw}
                style={canvasStyle}
                ref={canvasRef}>
            </canvas>
        </div>
    )
}

export default DrawingCanvas