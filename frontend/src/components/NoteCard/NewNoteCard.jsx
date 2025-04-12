import React from 'react'
import { MdOutlineAdd } from "react-icons/md";

const NewNoteCard = ({onCreate}) => {
  return (
    <>
    <button onClick={onCreate} className="flex flex-col justify-center text-green-800 items-center cursor-pointer bg-gray-100 min-h-[380px] max-h-[380px] w-full max-w-[380px] mx-9 my-7 rounded-2xl border-4 border-dashed border-amber-200 drop-shadow-2xl overflow-hidden transition-colors duration-300 hover:bg-slate-200">
        <h3 className='text-4xl'>New Note</h3>
        <div className='rounded-[50%] border-4 border-dashed mt-5'>
            <MdOutlineAdd size={80} />
        </div>      
    </button>
    </>
  )
}

export default NewNoteCard