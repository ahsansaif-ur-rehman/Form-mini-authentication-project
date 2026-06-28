import React, { useState } from 'react'
import '../styling/form.css'
import { useNavigate } from 'react-router-dom'


export default function SignupForm() {

  const navigate = useNavigate()

  const initiale = {
    fullname:'',
    email:'',
    password:''
  }
  const [form,setFormData] = useState(initiale)
  const {fullname,email,password} = form

  const [errors,setErrors] = useState({})

  const handleChange = (e)=>{
     const {name,value} = e.target
     setFormData({...form,[name]:value})
  }


  const handleValidation = ()=>{
    let errs = {}
    if(!fullname){
      errs.fullname = 'plz enter your full name'
    }
    if(!email){
      errs.email = 'plz enter your email'
    }
    if(!password){
      errs.password = 'plz enter your password'
    }

    setErrors(errs)

    return Object.keys(errs).length === 0
  }

  const Submit = (e)=>{
   e.preventDefault()
   const isvalid = handleValidation()

         if(isvalid){
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []

    const alreadyExist = existingUsers.find((u) => u.email === email)
    if(alreadyExist){
      setErrors({ email: 'This email is already registered' })
      return
    }
const newUser = { fullname, email, password }
existingUsers.push(newUser)
localStorage.setItem('users', JSON.stringify(existingUsers))
 
    

    setFormData(initiale)
    setErrors({})
    navigate('/')
  }
  }
  return (
    <div className='form-cont'>
      <div className="form">

        <h1>SignUp here</h1>
        <p>Create your account</p>

        <div className="form-data">
          <form action="">

            <div className='inputs'>

              <label>Full Name</label>
              <br />
              <input
                type="text"
                placeholder='Enter your full name'
                name='fullname'
                value={fullname}
                onChange={handleChange}
              />
              <br />
              <div>
                {/* error message will go here */}
                 {errors.fullname && <span className='text'>{errors.fullname}</span>}
              </div>

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

                   {errors.email && <span className='text'>{errors.email}</span>}
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
                    {errors.password && <span className='text'>{errors.password}</span>}
              </div>

            </div>

            <button className='login' onClick={Submit}>Signup</button>

            <p className='switch-text'>
              Already have an account?{' '}
              <span className='switch-link'  onClick={()=> navigate('/')} >Login here</span>
            </p>

          </form>
        </div>

      </div>
    </div>
  )
}
