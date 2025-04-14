import React, { useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import { validateEmail } from '../../utils/inputRegexHelper'
import axiosInstance from '../../utils/axiosInstance.js'


const Login = () => {
  const [loading,setLoading] = useState(true)
  const[email,setEmail] = useState('')
  const[password,SetPassword] = useState('')
  const[error,setError] = useState(null)

  const navigate = useNavigate()

    const getUserInfo = async() => {
      try {
        const response = await axiosInstance("/api/user-details")
        if(response.data && response.data.user){
          navigate("/", { replace: true });            
        }
      } catch (error) {
         setLoading(false)
      }
      }

      useLayoutEffect( () => {
        const fetchData = async() => {
        try {
          await getUserInfo()
          setLoading(false)
          }
         catch (error) {
          localStorage.clear();
        }
       
      }
      fetchData()
      }, [])

  const handleLogin = async(e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!password) {
      setError('Please enter a password')
      return
    }
    setError('')

    // LOGIN API CALL
    
    try {
      const response = await axiosInstance.post("/api/login", {
        email: email,
        password: password
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/")
      }
    } catch (error) {
      if(error.response){
        setError(error.response.data.message)
      } else {
        setError("An unexpected Error occured. Please try again")
      }
    }
  }
  if (loading) return null

  return (
    <>
    <Navbar />
    <div className='flex items-center justify-center mt-30'>
      <div className='w-100 border rounded  border-white bg-white p-8 drop-shadow-2xl'>
      <form onSubmit={handleLogin}>
        <h4 className='text-3xl text-center text-black mb-7 '>Login</h4>
        <input type="text" id='email' placeholder='Email' className='input-box mb-6'
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
        
        
        <PasswordInput value={password} onChange={(e) => SetPassword(e.target.value)} />

         {error? 
          <div className='h-5 text-center text-red-500'><p>{error}</p></div>:
          <div className="h-5"></div>
          }

        <button  type='submit' className='btn-login mt-3 mb-6'>Login</button>

        <p className='text-sm text-center mt-3'>
          Not Registered yet?{' '}
          <Link to='/signup' className='text-blue-600 font-bold underline'>Create an Account</Link>
        </p>
      </form>
      </div>
    </div>
    </>
  )
}

export default Login