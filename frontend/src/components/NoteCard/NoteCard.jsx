import React, { useState } from 'react';
import { BsPin } from 'react-icons/bs';
import { BsPinFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import isoTimeToLocalTime from '../../utils/isoTimeToLocalTime.js'

const NoteCard = ({ title, content, date, onEdit, onDelete, onPin , isPinned }) => { 

  return (
    <div className="flex flex-col bg-gray-100 min-h-[380px] max-h-[380px] w-full max-w-[380px] mx-9 my-7 rounded-2xl drop-shadow-2xl overflow-hidden">
  {/* Title Section */}
  <div className="bg-green-200 rounded-t-2xl h-13 px-5 py-2 flex items-center">
    <h6 className="text-xl font-semibold truncate" title={title}>
      {title.length > 24 ? `${title.slice(0, 25)}...` : title}
    </h6>
  </div>

  {/* Content Section */}
  <div className="px-5 py-1 mt-1 min-h-[200px]  ">
    <p className="text-gray-800 break-words ">
      {content.length > 280 ? `${content.slice(0, 400)}...` : content}
    </p>
  </div>

  {/* Footer Section */}
  <div className="flex justify-between items-center p-3 border-t-2 border-amber-200 bg-amber-200 rounded-b-2xl mt-auto">
    <p className="text-sm text-gray-700">{isoTimeToLocalTime(date)}</p>
    <div className='flex'>
      <button onClick={onEdit} className='cursor-pointer' >
      <FaEdit size={25}  className="text-gray-700 mx-2 transition-colors duration-200 hover:text-green-600 " />
      </button>
      <button onClick={onDelete} className='cursor-pointer'>
      <MdDeleteForever  size={25}  className="text-gray-700 mr-2 transition-colors duration-200 hover:text-red-600 " />
      </button>
      <button onClick={onPin} className='cursor-pointer'>
      {/*<BsPinFill /> */}
      {isPinned? <BsPinFill size={20}  className="text-gray-700 " /> : <BsPin  size={20}  className="text-gray-700 " />  }
      </button>
      
    </div>

  </div>

</div>
  );
};

export default NoteCard;