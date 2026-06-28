import React, { useState } from 'react'
import '../styling/form.css'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {


  const navigate = useNavigate()
const initiale  = {
 email:'',
 password:''
}
  const [form,setForm] = useState(initiale)

  const{email,password} = form

  const [error,setError] = useState({})



  

  const handleChange = (e)=>{
    const{name,value} = e.target
    setForm({...form,[name]:value})
  }


  const HandleValidation = ()=>{
    let errs = {}
    if(!email){
      errs.email = 'plz enter your email'
    }
    if(!password){
      errs.password = 'plz enter your password'
    }
   
setError(errs)
   return Object.keys(errs).length === 0
  }

  const handleSubmit = (e)=>{

    e.preventDefault()
    const isvalid = HandleValidation()


let existingUser = null
    if(isvalid){
     const user = JSON.parse(localStorage.getItem('users')) || []

     existingUser = user.find((user)=> user.email === email && user.password === password)
    }

    if( isvalid &&!existingUser){
     setError({text:'invalid email or password'})
     return;
    }



   if(existingUser){
    localStorage.setItem('currentuser', JSON.stringify(existingUser))
    navigate('/welcome')
  }
   
  }
  return (
    <div className='form-cont'>
      <div className="form">

        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>

        <div className="form-data">
          <form action="">

            <div className='inputs'>

              <label>Email Address</label>
              <br />
              <input
                type="email"
    
                placeholder='Enter your email'
                name='email'
                value={email}
                onChange={handleChange}
              />
              <br />
              <div>
                {/* error message will go here */}
                {error.email && <span className='text'>{error.email}</span>}
              </div>

              <label className='pass'>Password</label>
              <br />
              <input
                type="password"
                name='password'
                placeholder='Enter Your Password'
                value={password}
                onChange={handleChange}
              />
              <div>
                {/* error message will go here */}

                {error.password && <span className='text'>{error.password}</span>}
              </div>

              <div>
                {/* general error will go here */}

                {error.text && <span className='text'>{error.text}</span>}
              </div>

            </div>

            <button className='login' onClick={handleSubmit}>Login</button>

            <p className='switch-text'>
              Don't have an account?{' '}
              <span className='switch-link' onClick={()=> navigate('/signup')}>Signup here</span>
            </p>

          </form>
        </div>

      </div>
    </div>
  )
}
