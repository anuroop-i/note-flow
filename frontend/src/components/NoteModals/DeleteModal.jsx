import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import axiosInstance from '../../utils/axiosInstance';

const DeleteModal = ({open, onClose, noteId, getNotes}) => {

     const deleteNote = async(noteId) => {    
        try {
          const response = await axiosInstance.delete(`/api/delete-note/${noteId}`)
          if(response.status === 200) {
            onClose()
            getNotes()

          }
        } catch (error) {
          console.log(error)
        }
      }
  return (
    open ?
    <div className='fade-in flex justify-center items-center fixed inset-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)]'>

        <div className='w-70 h-50 bg-white rounded-2xl'>
             <div className='flex justify-end items-center my-2 mx-2'>
                <button onClick={onClose} className=''><IoMdCloseCircle size={30}/></button>
            </div>
            <div className=' mt-6 text-center'>
                <p className='mb-7 text-2xl'>Delete Note?</p>
                 <div className='flex justify-around'>
                    <button className='bg-red-600 text-white text-xl text-bold rounded-2xl w-15 h-10 transition-colors duration-200 hover:bg-red-400' onClick={() => deleteNote(noteId)}>YES</button>
                    <button className='bg-gray-500 text-white text-xl rounded-2xl w-15 h-10 transition-colors duration-200 hover:bg-gray-600' onClick={onClose}>NO</button>
                </div>
            </div>
        </div>
    </div>:
    null
  )
}

export default DeleteModal