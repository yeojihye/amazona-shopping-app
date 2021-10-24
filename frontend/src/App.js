import { useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

function App() {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  return (
    <BrowserRouter>
      <div className='grid-containter'>
        <header className='row'>
          <div>
            <Link className='brand' to='/'>
              amazona
            </Link>
          </div>
          <div>
            <Link to='/cart'>
              장바구니
              {cartItems.length > 0 && <span className='badge'>{cartItems.length}</span>}
            </Link>
            <Link to='/signin'>로그인</Link>
          </div>
        </header>
        <main>
          <Route path='/cart/:id?' component={CartScreen} exact></Route>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
        </main>
        <footer className='row center'>All rights reserved.</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
