import React, { useState , useLayoutEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import { Link , useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/inputRegexHelper'
import axiosInstance from '../../utils/axiosInstance'


const SignUp = () => {
  const [loading,setLoading] = useState(true)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,SetPassword] = useState('')
  const [error,setError] = useState(null)

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
          }
      catch (error) {
        localStorage.clear();
        setLoading(false)
        }
    }
    fetchData()
      }, [])

  const handleSignUp = async(e) => {
    e.preventDefault()

    if(!name){
      setError('Please enter a Name')
      return
    }
    if(!validateEmail(email)){
      setError('Please enter a valid Email')
      return
    }
    if (password.length < 8){
      setError('Password must be atleast 9 characters long')
      return
    }
         
    setError('')

    // Signup API Call
    try {
      const response = await axiosInstance.post("/api/create-account" , {
        fullName: name,
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
    <div>
      <Navbar />
      <div className='flex items-center justify-center mt-30'>
        <div className='w-100 border rounded  border-white bg-white p-8 drop-shadow-2xl'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-3xl text-center text-black mb-7 '>Sign Up</h4>
            {/* Name Input */}
            <input type="text" placeholder='First Name & Last Name' className='input-box mb-6'
            value={name}
            onChange={(e) => setName(e.target.value)} />
            {/* Email Input */}
            <input type="text" placeholder='Email' className='input-box mb-6'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        
        
            <PasswordInput value={password} onChange={(e) => SetPassword(e.target.value)} />

            {error? 
            <div className='h-5 text-center text-red-500'><p>{error}</p></div>:
            <div className="h-5"></div>
            }

            <button  type='submit' className='btn-login mt-3 mb-6'>Sign Up</button>

            <p className='text-sm text-center mt-3'>
              Already Registered?{' '}
              <Link to='/login' className='text-blue-600 font-bold underline'> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp