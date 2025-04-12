import React from 'react'
import { getInitials , getFirstName } from '../../utils/nameHelper.js'

const ProfileInfo = ({name , onLogout}) => {


  return (
    <div className="flex items-center" >
      <button className='text-2xl text-center  bg-amber-300 h-10 w-10 rounded-full'>{getInitials(name)}</button>
      <div className='ml-3 text-center'>
        <p className='text-base '>{getFirstName(name)}</p>
        <button onClick={onLogout} className='text-sm underline cursor-pointer'>Logout</button>
      </div>
    </div>
  )
}

export default ProfileInfo