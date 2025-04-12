import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({value, onChange, onSearch, onClearSearch}) => {
  return (
    <div className='flex items-center w-150 border rounded-full  bg-slate-100  border-transparent'>
        <input type="text" placeholder='Search Notes'
        value={value} onChange={(e) => onSearch(e.target.value)}
        className='w-full pl-5 p-2 outline-none'/>
        {value && <IoMdClose size={30} onClick={onClearSearch} className='text-slate-500 hover:text-black' />}
        
    </div>
  )
}

export default SearchBar