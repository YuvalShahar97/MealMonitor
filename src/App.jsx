
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './login/loginPage'
import React from 'react'
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path="/Home" element={<HomePage/>}/>
      <Route path="/" element={<LoginPage/>}/>

    </Routes>
  </BrowserRouter>
</>
  )
}

export default App
