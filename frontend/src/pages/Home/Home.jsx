import React, { useEffect, useState, useLayoutEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";

import EditNoteModal from "../../components/NoteModals/EditNoteModal";
import NewNoteCard from "../../components/NoteCard/NewNoteCard";
import NewNoteModal from "../../components/NoteModals/NewNoteModal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import DeleteModal from "../../components/NoteModals/DeleteModal";

const Home = () => {
  const [loading,setLoading] = useState(true)

  const [notes, setNotes] = useState([]);               // for displaying notes
  const [toEditNote,setToEditNote] = useState("")       // Note which is to be edited

  const [toDeleteNoteId,setToDeleteNoteId] = useState("")  // Note which is to be deleted

  const [userInfo,setUserInfo] = useState(null)

  const [searchQuery,setSearchQuery] = useState("")

  const navigate = useNavigate()

  const getUserInfo = async() => {
  
      const response = await axiosInstance("/api/user-details")
      if(response.data && response.data.user){
        setUserInfo(response.data.user.fullName)             // Fullname of user
      }      
    }
  

  const getNotes = async() => {
      const response = await axiosInstance("/api/get-all-notes")
      if(response.data && response.data.notes){
      setNotes(response.data.notes)
      }
  }
  
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await getUserInfo();
        await getNotes();
        setLoading(false); 
      } catch (error) {
        localStorage.clear();
        navigate("/login", { replace: true });
      }
    };
  
    fetchData();
  }, []); 
  
  
 

  const [viewEditModal,setViewEditModal] = useState(false)      // State for viewing Edit Note Modal

  const [viewCreateModal,setViewCreateModal] = useState(false)  // State for viewing Create Note Modal

  const [viewDeleteModal,setViewDeleteModal] = useState(false)  // State fro viewing Delete Modal

  const handleEditNote = (i) => {                  
    console.log(`notes entry: ${i} opened`)
    setToEditNote(notes[i])
    setViewEditModal(true) 
  }

  const handleCreateNotes = () => {
    console.log(`Create New Note Button Clicked`)
    setViewCreateModal(true)
  }

  const handleDeleteNote = (i) => {
    setToDeleteNoteId(notes[i]._id)
    setViewDeleteModal(true)
  }

  const onPin = async(i) => {
    
    try {
      const response = await axiosInstance.put(`/api/update-note-pin/${notes[i]._id}`)
      if(response.status === 200) {
        getNotes()
      }
    } catch (error) {
      console.log(error)
    }

  }

  const onSearch = (query) => {
    setSearchQuery(query)
  }

  

  if (loading) return null
  return (
    <div>
      <Navbar userInfo={userInfo} onSearch={onSearch}/>
      <div className=" ml-9 flex  md:justify-start flex-wrap ">      
      {
        !searchQuery
          ? notes.map((note, index) => (
          <NoteCard 
          key={index} 
          title={note.title} 
          onDelete={() => handleDeleteNote(index)} 
          onEdit={() => handleEditNote(index)} 
          content={note.content} 
          date={note.date} 
          isPinned={note.isPinned} 
          onPin={() => onPin(index)}
          />)) : 
          notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())).map((note, index) => (
          <NoteCard 
          key={index} 
          title={note.title} 
          onDelete={() => handleDeleteNote(index)} 
          onEdit={() => handleEditNote(index)} 
          content={note.content} 
          date={note.date} 
          isPinned={note.isPinned} 
          onPin={() => onPin(index)}
          />
        ))
        }
        <NewNoteCard onCreate={handleCreateNotes}/>
      </div>
      <div>
        <EditNoteModal open={viewEditModal} onClose={() => setViewEditModal(false)}  note={toEditNote} getNotes={getNotes}/>
        <NewNoteModal open={viewCreateModal} onClose={() => setViewCreateModal(false)} getNotes={getNotes} />
        <DeleteModal open={viewDeleteModal} onClose={() => setViewDeleteModal(false) } noteId={toDeleteNoteId} getNotes={getNotes} />
      </div>
    </div>
  );
};

export default Home;
