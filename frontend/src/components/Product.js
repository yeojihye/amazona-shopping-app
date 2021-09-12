import React from 'react'
import Rating from './Rating'

const Product = (props) => {
  const { product } = props // destructuring
  return (
    <div key={product._id} className='card'>
      <a href={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className='medium' />
      </a>
      <div className='card-body'>
        <a href={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </a>
        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
      </div>
    </div>
  )
}

export default Product
