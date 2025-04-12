// MODULES
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cors from 'cors'

// MODELS
import User from './models/user.model.js'
import Note from './models/note.model.js'


// Auth
import authenticateToken from './utils/utilities.js'


dotenv.config()

mongoose.connect(process.env.MONGO_URL)

const app = express()
const PORT = process.env.PORT || 6900

app.use(cors({
  origin: "https://note-flow.onrender.com"
}));

app.use(express.json())

// Create Account  
app.post('/api/create-account', async(req,res) => {

  const {fullName, email, password} = req.body

  if(!fullName) return res.status(400).json({ error : true, message: 'Full Name is Required'})
  if(!email) return res.status(400).json({ error : true, message: 'email is Required'})
  if(!password) return res.status(400).json({ error : true, message: 'password is Required'})

    const isUser = await User.findOne({email : email})

    if (isUser) return res.json({error:true,message:"User Already Exists"})

      const user = new User({
        fullName,
        email,
        password
      })

      await user.save()

      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30000m"
      })

      return res.json({
        error: false,
        user,
        accessToken,
        message : 'Registration Sucessful'
      })
})

// Login
app.post('/api/login', async(req,res) => {
    const {email,password} = req.body

    if(!email) return res.status(400).json({error : true, message : "Email is Required"})
    if(!password) return res.status(400).json({error : true, message : "Password is Required"})

    const userInfo = await User.findOne({email : email})

    if(!userInfo) return res.status(400).json({error : true, message : "email is not registered"})
    
    if(userInfo.password != password) return res.status(400).json({error:true,message:"Wrong Password"})

    if(userInfo.email == email && userInfo.password == password) {
      const user = { user: userInfo }
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{ expiresIn : "30000m"})

      return res.json({
        error : false,
        message: "Login Sucessful",
        email,
        accessToken

      })    
    }

    else return res.status(400).json({error : true, message : "invalid credintals"}) 
})

// Get user Details
app.get('/api/user-details', authenticateToken,async(req,res) => {
  const {user} = req.user
  const isUser = await User.findOne({_id: user._id})
  if(!isUser) return res.status(400).json({error:true,message:"User not found"})
  try {
      return res.json({error:false,message:"User Found",user: user})
  } catch (error) {
    return res.status(500).json({error:true,message:"internal server error"})
  }
})

// Add Note  // Create
app.post('/api/add-note',authenticateToken, async(req,res) => {
  const {title,content} = req.body
  const { user } = req.user



  if(!title) return res.status(400).json({error : true, message : 'Title is Required'})
  if(!content) return res.status(400).json({error : true, message : 'Content is Required'})

    try {
      const note = new Note({
        title,
        content,
        userId : user._id
      })
      await note.save()
      return res.status(201).json({error:false, message:'note saved sucessfully'})
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: true, message:"internal server error"})
    }
})

// Get All Notes // Read
app.get('/api/get-all-notes',authenticateToken,async(req,res) => {

  const {user} = req.user

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1, date: -1 });

    
    return res.json({
      error:false,notes,message:"All notes retrieved"
    })
  } catch (error) {
    return res.status(500).json({error:true,message:"internal server error"})
  }
  
})

// Edit Note  // Update
app.put("/api/edit-note/:noteId",authenticateToken, async(req,res) => {
  const noteId = req.params.noteId
  const {title,content} = req.body
  const { user } = req.user

  if(!title) return res.status(400).json({error:true, message:"title is required"})
  if(!content) return res.status(400).json({error:true, message:"content is required"})

  try {
    const note = await Note.findOne({_id: noteId, userId: user._id})
    if(!note) return res.status(400).json({error:true, message:"Note not found"})

    if(title) note.title = title
    if(content) note.content = content

    
    await note.save()
    return res.json({error:false, message:"Note updated sucessfully"})
  } catch (error) {
    return res.status(500).json({error:true,message:"internal server error"})
  }
})

// Delete Note // Delete
app.delete("/api/delete-note/:noteId", authenticateToken,async(req,res) => {
  const noteId = req.params.noteId
  const {user} = req.user

  try {
    const note = await Note.findOne({ _id: noteId, userId : user._id})

    console.log(note)
    if(!note) return res.status(400).json({error:true,message:"Note not found"})

    await Note.deleteOne({ _id: noteId, userId : user._id})

    return res.json({error:false,message:"Note Deleted Sucessfully"})
  } catch (error) {
    return res.status(500).json({error:true,message:"Internal server error"})
  }



} )

// Update isPinned
app.put("/api/update-note-pin/:noteId", authenticateToken, async(req,res) => {

  const noteId = req.params.noteId
  const {user} = req.user

  try {
    const note = await Note.findOne({_id : noteId, userId : user._id})
    console.log(note)
    if(!note) return res.status(400).json({error:true,message:"Note Not found"})
    note.isPinned = !note.isPinned
    const notePinState = `Note is pinned : ${note.isPinned}`
    await note.save()
    return res.json({error:false,message:notePinState})
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({error:true,message:"internal server error"})
  }

})


app.listen(PORT,() => {
  console.log(`Server is running`);
})
