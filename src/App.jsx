import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'
import { styled } from '@mui/system'

function App() {

  const AppContainer = styled('div')({
    backgroundColor: '#14161a',
    minHeight: '100vh',
    color: 'white',
  });

  return (
    <BrowserRouter>
      <AppContainer>
        <Header/>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
        </AppContainer>
    </BrowserRouter>
  )
}

export default App
