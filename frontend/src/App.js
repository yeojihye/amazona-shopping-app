import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-containter'>
        <header className='row'>
          <div>
            <a className='brand' href='root'>
              amazona
            </a>
          </div>
          <div>
            <a href='/cart'>cart</a>
            <a href='/signin'>login</a>
          </div>
        </header>
        <main>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
        </main>
        <footer className='row center'>All rights reserved.</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
