import React from 'react'
import { IoClose } from "react-icons/io5";

const EditTag = ({tag,deleteTag,index}) => {


  return (
    <div className="border-slate-300 border-2 rounded-xl flex justify-between w-25 p-2 mx-2 my-3 drop-shadow">
    <p>#{tag}</p>    
    <button className='ml-3' onClick={() => deleteTag(index)}><IoClose /></button>
    </div>
  )
}

export default EditTag