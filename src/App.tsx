import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { logout } from './services/login.service'
import { Navigate, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { takeAccessToken } from './axios/token.util'
import Layout from './pages/Layout/Layout'

function App() {
  const navigate = useNavigate()

  const isLoggerdIn = takeAccessToken() ? true : false

  const logoutHandler = async() =>{
    const data = await logout();
    if(data.code === 200) {
      navigate('/login')
    }
  }

  const location = useLocation()


  return (
    isLoggerdIn ? <Layout></Layout> : 
    <Navigate to="/login" replace state={{from: location}}></Navigate>
  )
}

export default App
