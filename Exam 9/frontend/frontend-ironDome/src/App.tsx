import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage/LoginPage'
import Register from './pages/RegisterPage/RegisterPage'

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route path="/candidates" element={<ProtectedRoute></></ProtectedRoute>}></Route>
        {/* <Route path="/candidates/admin" element={<ProtectedRouteAdmin></></ProtectedRouteAdmin>}></Route>
        <Route path="/candidates/socket" element={</>}></Route> */} */
      </Routes>
    </>
  )
}

export default App
