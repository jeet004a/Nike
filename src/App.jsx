import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Men from './pages/Men'
import Women from './pages/Women'
import SignUp from './pages/SignUp'
import Category from './pages/Category'
import Product from './pages/Product'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Signin from './pages/Signin'
import UserNavBar from './components/Signin/UserNavBar'
import NavBar from './components/SignUp/NavBar'
import Cart from './components/Cart/Cart'
import { useCart } from './context/CartContent'
import Payment from './pages/Payment'
import WishList from './components/WishList/WishList'

function App() {
  // const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartItems, addToCart } = useCart()
  // console.log(user)
  // console.log(cartItems.length)
  return (
    <div className='overflow-x-hidden'>
      {/* <Home /> */}
      {user ? <UserNavBar />
        : <div className='w-screen h-8 bg-[#F5F5F5] flex justify-end'>
          <div className='w-[10vw] h-full gap-6   flex justify-start items-center font-[font1] text-[0.7vw] cursor-pointer'>
            <h1 onClick={() => navigate('/signup')}>Sing Up</h1>
            <div className='h-3 w-[0.1vw] bg-black'></div>
            <h1 onClick={() => navigate('/signin')}>Login</h1>
          </div>
        </div>
      }
      {/* <UserNavBar /> */}
      {
        location.pathname != '/payment' ? <NavBar /> : null
      }
      {/* <NavBar /> */}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/men' element={<Men />} />
        <Route path='/women' element={<Women />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </div>
  )
}

export default App
