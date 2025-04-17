import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from "./components/Signup/Login/Login"
import VerifyEmail from "../src/components/Signup/verifyEmail"


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/acceptInvite" element={<VerifyEmail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
