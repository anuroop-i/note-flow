import React, { useState } from 'react'

import ProfileInfo from '../ProfileInfo/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

const Navbar = ({userInfo,onSearch}) => {



  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  const onClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-3xl text-black mr-3 font-medium'>Note<span className='font-light text-black'><i>FLOW</i></span></h2>

        
        {userInfo?
        <>
        <SearchBar onClearSearch={onClearSearch} onSearch={onSearch} />

        <ProfileInfo onLogout={onLogout} name={userInfo}  />  
        </> :  
        null
        }
        
    </div>
  )
}

export default Navbar