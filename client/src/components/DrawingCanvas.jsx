import { useState } from "react"

const DrawingCanvas = () => {
    const [canvasState, setCanvasState] = useState(null)
    

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

            ctx.lineTo(event.clientX - canvas.offsetLeft, 
                event.clientY - canvas.offsetTop)
            ctx.stroke()
        }
    }

    const stopDraw = (event) => {
        painting = false
        const canvas = event.target
        const ctx = canvas.getContext("2d")

        ctx.stroke()
        ctx.beginPath()
    }

    const canvasStyle = {
        "border": "1px solid"
    }

    return (
        <div>
            <canvas onMouseDown={startDraw} 
                onMouseMove={draw} 
                onMouseUp={stopDraw}
                style={canvasStyle}>

            </canvas>
        </div>
    )
}

export default DrawingCanvas