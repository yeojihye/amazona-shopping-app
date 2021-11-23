import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SigninScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo, loading, error } = userSignin

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, redirect, userInfo])
  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>로그인</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor='email'>이메일 주소</label>
          <input
            type='email'
            id='email'
            placeholder='이메일을 입력하세요'
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            id='password'
            placeholder='비밀번호를 입력하세요'
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            새로운 고객이신가요? <Link to='/register'>계정 생성</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
