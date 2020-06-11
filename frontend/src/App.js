import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../src/routes'
import Header from '../src/components/Header'
import './global.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  )
}

export default App
