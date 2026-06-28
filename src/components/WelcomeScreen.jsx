import React from 'react'
import '../styling/form.css'
import { useNavigate } from 'react-router-dom'

export default function WelcomeScreen() {

  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem('currentuser'))

  const handleLogout = () => {
    localStorage.removeItem('currentuser')
    navigate('/')
  }

  return (
    <div className='form-cont'>
      <div className="form">

        <div className='welcome-icon'>🎉</div>
        <h1>Welcome Back!</h1>
        <p>You have successfully logged in, <strong>{currentUser?.fullname}</strong>!</p>

        <button className='login' onClick={handleLogout}>Logout</button>

      </div>
    </div>
  )
}