import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart)
  if (!cart.paymentMethod) {
    props.history.push('/payment')
  }
  const toPrice = (num) => Number(num.toFixed(2)) // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  const placeOrderHandler = () => {
    // TODO: dispatch place order action
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>배송</h2>
                <p>
                  <strong>이름:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>주소:</strong> {cart.shippingAddress.address},{cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>결제</h2>
                <p>
                  <strong>방법:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>주문 항목</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className='row'>
                        <div>
                          <img src={item.image} alt={item.name} className='small'></img>
                        </div>
                        <div className='min-30'>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>

                        <div>
                          {item.qty} x {item.price} 원 = {item.qty * item.price} 원
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>주문 요약</h2>
              </li>
              <li>
                <div className='row'>
                  <div>항목</div>
                  <div>{cart.itemsPrice.toFixed(2)} 원</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>부가세</div>
                  <div>{cart.taxPrice.toFixed(2)} 원</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>총 금액</div>
                  <div>
                    <strong>{cart.totalPrice.toFixed(2)} 원</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type='button'
                  onClick={placeOrderHandler}
                  className='primary block'
                  disabled={cart.cartItems.legnth === 0}
                >
                  주문 결제
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen
