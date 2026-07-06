import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

export function AddTask() {

  const [ataskData, asetTaskData]= useState({title:"",desc:""});
  const navigate = useNavigate();

  const taskHandler =async ()=>{
    if(!asetTaskData.title || !ataskData.desc){
      alert("Please fill the form");
      return;
    }
    let result =await fetch('https://todo-backend-production-ea20.up.railway.app/add', {
      method:'POST',
      body:JSON.stringify(ataskData),
      credentials:'include',
      headers: {
        'Content-Type':'application/json'
      }
    })
    result =await result.json();
    if(result.success){
      console.log("new task added");
      navigate("/");
    }

  }

 

  return (

    <>
     <div>
     <Navbar/>
    </div>
<div className='flex flex-col justify-center items-center  mt-5'>
    <form onSubmit={taskHandler} className='h-120 w-150 bg-white gap-1 p-1 rounded-2xl shadow-[0_20px_60px_10px_rgba(0,0,0,0.4)]  flex flex-col justify-center '>
      <h1 className='font-bold text-2xl mx-auto'>Add New Task</h1>
      <div className='ml-20 flex flex-col gap-1 mt-5'>
        <label htmlFor='title' className='font-bold pl-1'>Title:</label>
      <input onChange={(e)=>asetTaskData({...ataskData,title:e.target.value})} value={ataskData.title} type='text' id='title' placeholder='Enter task title' className='outline-none border rounded-[10px] border-gray-500 p-2 w-100'/>
      <label htmlFor='desc' className='font-bold mt-5 pl-2'>Description:</label>
      <textarea onChange={(e)=>asetTaskData({...ataskData,desc:e.target.value})} value={ataskData.desc} id='desc' type='text' placeholder='Enter task description' rows={4} className='outline-none border rounded-2xl border-gray-500 p-2 w-100'/>
    
      </div>
<button  type='submit'  className='font-bold bg-blue-500 p-2 rounded text-white cursor-pointer w-30 mt-5 mx-auto hover:bg-blue-800'>Add Task</button>     
    </form>
    </div>
    </>
   
  )
}

export default AddTask
