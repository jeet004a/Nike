import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Men from './pages/Men'
import Women from './pages/Women'
import SignUp from './pages/SignUp'
import Category from './pages/Category'
import Product from './pages/Product'
import { Routes, Route } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      {/* <Home /> */}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/men' element={<Men />} />
        <Route path='/women' element={<Women />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
