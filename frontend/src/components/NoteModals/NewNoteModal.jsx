import React , {useEffect, useState} from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import axiosInstance from '../../utils/axiosInstance';


const NewNoteModal = ({open, onClose, getNotes}) => {

    const [newTitle,setNewTitle] = useState('')     //title
    const [newContent,setNewContent] = useState('') //body
    const [error,setError] = useState("")

    useEffect(() => {
        setError("")
        setNewTitle("")
        setNewContent("")
    
    }, [open])
    

    const createNote = async(e) => {
        e.preventDefault()        
        if(!newTitle){
            setError("Title Cannot be Empty")
            return
        }
        if(!newContent){
            setError("Content Cannot be Empty")
            return
        }
        setError("")

        try {
            const response = await axiosInstance.post("/api/add-note",{
                title : newTitle,
                content : newContent
            })
            if(response.data){
                onClose()
                getNotes()
                setNewTitle("")
                setNewContent("")
            }
        } catch (error) {
            console.log(error);          
        }
    }
    
  return (
   open ?
    <div className=' flex justify-center items-center fixed inset-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.3)]'>
        <div className='bg-[rgba(255,255,255)] w-[600px] h-[650px] drop-shadow-2xl border-amber-300 rounded-2xl '>
            <div className='flex justify-end items-center m-3'>
                <button onClick={onClose} className=''><IoMdCloseCircle size={30}/></button>
            </div>
            <div className='flex items-center mx-6  '>
                <form onSubmit={createNote} >
                    <label className='font-semibold text-xl' htmlFor="">TITLE</label>
                    <input type="text" placeholder='Enter a Title' className='w-full py-2 text-xl border-1 rounded-sm p-2 mb-4 mt-1 active:border-blue-700 ' 
                    value={newTitle} onChange={(e) => setNewTitle(e.target.value)}  />
                    <label className='font-semibold text-xl' htmlFor="">CONTENT</label>
                    <textarea name="body" placeholder='Enter Notes' className='w-full h-80 border-1 rounded-sm text-lg p-2 mt-1  active:border-blue-700 resize-none ' 
                    value={newContent} id="" onChange={(e) => setNewContent(e.target.value)}/>
                    <div className='flex flex-col justify-center items-center mt-4 py-3'>
                        <div className=' min-h-[25px]'>
                        {error? <p className='text-red-600 '>{error}</p> : null  }
                        </div>                  
                        <button type='submit' className=' rounded-2xl mt-5 p-3 w-80 font-semibold text-white text-xl bg-blue-400 cursor-pointer'>
                            Save Note
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
        
    </div> : null 
  )
}

export default NewNoteModal