import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from "./components/Signup/Login/Login"


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
