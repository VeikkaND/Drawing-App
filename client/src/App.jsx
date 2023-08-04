import { Route, Routes, BrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Room from "./pages/Room"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:room" element={<Room />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
