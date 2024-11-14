import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage/LoginPage'
import Register from './pages/RegisterPage/RegisterPage'
import AttackPage from './pages/AttackPage/AttackPage'
import DefensePage from './pages/DefensePage/DefensePage'
import ProtectedRouteAttack from './ProtectedRoute/ProtectedAttack'
import ProtectedRouteDefense from './ProtectedRoute/ProtectedDefense'

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
         <Route path="/attack" element={<ProtectedRouteAttack><AttackPage/></ProtectedRouteAttack>}></Route>
        <Route path="/defense" element={<ProtectedRouteDefense><DefensePage/></ProtectedRouteDefense>}></Route>
      </Routes>
    </>
  )
}

export default App
