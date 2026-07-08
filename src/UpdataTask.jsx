import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { data, useNavigate, useParams } from 'react-router-dom';

export function UpdataTask() {

  const [taskData, setTaskData]= useState();
 const navigate = useNavigate();
const {id}= useParams();


  useEffect(()=>{
getTask(id);
  },[])

 const getTask =async (id)=>{
let data =await fetch('https://todo-backend-production-ea20.up.railway.app/task/'+id,{ credentials:'include',});

data =await data.json();

if(data.result){
    setTaskData(data.result);
    
}}

const updateTaskHandler= async ()=>{
 console.log("function csalled", taskData);
 let task = await fetch("https://todo-backend-production-ea20.up.railway.app/update-task",{
    method:'put',
    body:JSON.stringify(taskData),
     credentials:'include',
    headers:{
        'Content-Type': 'application/json'
    }
 });
 task= await task.json();
 if(task){
    navigate('/')
 }
}





 

  return (

    <>
     <div>
     <Navbar/>
    </div>
<div className='flex flex-col justify-center items-center  mt-5'>
    <div className='h-120 w-150 bg-white gap-1 p-1 rounded-2xl shadow-[0_20px_60px_10px_rgba(0,0,0,0.4)]  flex flex-col justify-center '>
      <h1 className='font-bold text-2xl mx-auto'>Update Task</h1>
      <div className='ml-20 flex flex-col gap-1 mt-5'>
        <label htmlFor='title' className='font-bold pl-1'>Title:</label>
      <input value={taskData?.title || ''} onChange={(e)=>setTaskData({...taskData,title:e.target.value})} type='text' id='title' placeholder='Enter task title' className='outline-none border rounded-[10px] border-gray-500 p-2 w-100'/>
      <label htmlFor='desc' className='font-bold mt-5 pl-2'>Description:</label>
      <textarea value={taskData?.desc || ''} onChange={(e)=>setTaskData({...taskData,desc:e.target.value})} id='desc' type='text' placeholder='Enter task description' rows={4} className='outline-none border rounded-2xl border-gray-500 p-2 w-100'/>
    
      </div>
<button onClick={updateTaskHandler}   className='font-bold bg-blue-500 p-2 rounded text-white cursor-pointer w-30 mt-5 mx-auto hover:bg-blue-800'>Update Task</button>     
    </div>
    </div>
    </>
   
  )
}

export default UpdataTask
