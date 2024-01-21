import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.scss'
import Products from './pages/Products'
import Reviews from './pages/Reviews'
import { useState } from 'react'

function App() {
  const [title, setTitle] = useState()
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products setTitle={setTitle}/> } />
        <Route path='/reviews/:id' element={<Reviews title={title} />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
