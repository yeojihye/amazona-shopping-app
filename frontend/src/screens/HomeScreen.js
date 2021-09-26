import React, { useState, useEffect } from 'react'
import Product from '../components/Product'
// import data from '../data'
import axios from 'axios'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

const HomeScreens = () => {
  // hook
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('/api/products')
        setLoading(false)
        setProducts(data) // state를 변경시 setProducts로 변경
        console.log(data)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className='row center'>
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeScreens
