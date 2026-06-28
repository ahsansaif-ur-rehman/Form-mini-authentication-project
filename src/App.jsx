import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import WelcomeScreen from './components/WelcomeScreen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
    </Routes>
  )
}