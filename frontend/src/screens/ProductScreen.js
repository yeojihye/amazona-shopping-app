import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import data from '../data'

const ProductScreen = ({ match }) => {
  const product = data.products.find((x) => x._id === match.params.id)
  if (!product) return <div>해당 제품이 없습니다.</div>
  return (
    <div>
      <Link to='/'>홈으로 돌아가기</Link>
      <div className='row top'>
        <div className='col-2'>
          <img className='large ' src={product.image} alt={product.name} />
        </div>
        <div className='col-1'>
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </li>
            <li>가격: ${product.price}</li>
            <li>
              제품 설명: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <div className='row'>가격</div>
                <div className='price'>${product.price}</div>
              </li>
              <li>
                <div className='row'>상태</div>
                <div>{product.countInStock > 0 ? <span className='success'>재고있음</span> : <span className='danger'>재고없음</span>}</div>
              </li>
              <li>
                <button className='primary block'>장바구니에 추가</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen
