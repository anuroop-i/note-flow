import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type : String, required : true },
    content : { type : String, required : true },
    isPinned : { type : Boolean, default : false},
    userId : { type : String , required : true},
    date : { type : Date , default : Date.now}
})

export default mongoose.model("Note", noteSchema)