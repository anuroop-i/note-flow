import React, { useState } from 'react'
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa";


const PasswordInput = ({value,onChange,placeholder}) => {

    const[isShowPass,setShowPass] =useState(false)

    const toggleShowPass = () => {
        setShowPass(!isShowPass)
    }

  return (
    <div className='flex items-center bg-transparent border-[1px] border-gray-400 rounded px-3 py-3 mb-3 '>
        <input
        value={value}
        onChange={onChange}
        type={isShowPass? 'text' : 'password'}
        placeholder={placeholder || "Password"}
        className='outline-none w-70'
        />
        {isShowPass ? 
        <FaRegEyeSlash size={22} onClick={toggleShowPass} className='text-blue-500 cursor-pointer' /> :
        <FaRegEye size={22} onClick={toggleShowPass} className='text-blue-500 cursor-pointer' />}
    </div>
    
  )
}

export default PasswordInput