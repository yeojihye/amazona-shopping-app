import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import MessageBox from '../components/MessageBox'

const CartScreen = (props) => {
  const productId = props.match.params.id
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log('장바구니 항목', cartItems)
  const dispatch = useDispatch()

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty]) // [dispatch, productId, qty]가 바뀌면 콜백함수 실행

  const removeFromCartHandler = (id) => {
    // 삭제 action
    console.log('삭제버튼')
  }
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping')
  }

  return (
    <div className='row top'>
      <div className='col-2'>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            장바구니가 비어있습니다. <Link to='/'>상점으로 가기</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className='row'>
                  <div>
                    <img src={item.image} alt={item.name} className='small'></img>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='col-1'>
        <div className='card card-body'>
          <ul>
            <li>
              <h2>
                서브합계 ({cartItems.reduce((a, c) => a + c.qty, 0)} 개) :
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} 원
              </h2>
            </li>
            <li>
              <button
                type='button'
                onClick={checkoutHandler}
                className='primary block'
                disabled={cartItems.length === 0}
              >
                결제하기
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CartScreen
