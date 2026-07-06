import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

function Signup() {
// const API_URL = "https://todo-backend-production-ea20.up.railway.app";
const[userData, setUserData]= useState();
const navigate= useNavigate();

 useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate('/');
    }
  })

const handleSignup =async ()=>{
 let result =await fetch("https://todo-backend-production-ea20.up.railway.app/signup", {
      method:'POST',
      body:JSON.stringify(userData),
      headers: {
        'Content-Type':'application/json'
      }
    })
    result =await result.json();
    if(result.success){
      alert("user added");
   //document.cookie='token='+result.token;
   //localStorage.setItem('login', userData.email);
   navigate('/login');
    }
}

  return (
    <><Navbar/>
    <div  className='flex flex-col justify-center items-center  mt-5'>

        <div  className='h-120 w-150 bg-white gap-1 p-1 rounded-2xl shadow-[0_20px_60px_10px_rgba(0,0,0,0.4)]  flex flex-col justify-center '>
     
    <h1 className='font-bold text-2xl mx-auto'>Signup</h1>  
<div className='ml-20 flex flex-col gap-1 mt-5 '>

      <label htmlFor='name' className='font-bold pl-1'>Name:</label>
      <input onChange={(event)=>setUserData({...userData, name:event.target.value})}autoComplete='name' id='name' type='text' name='name' placeholder='Enter Name' className='outline-none border rounded-[10px] border-gray-500 p-2 w-100'/>
   
     <label htmlFor='email' className='font-bold pl-1'>Email:</label>
      <input onChange={(event)=>setUserData({...userData, email:event.target.value})} autoComplete='email' id='email' type='text' name='email' placeholder='Enter Email' className='outline-none border rounded-[10px] border-gray-500 p-2 w-100'/>
   
     <label htmlFor='password' className='font-bold pl-1'>Password:</label>
      <input onChange={(event)=>setUserData({...userData, password:event.target.value})} id='password' type='text' name='password' placeholder='Enter Password' className='outline-none border rounded-[10px] border-gray-500 p-2 w-100'/>
   
 

</div>
 <button onClick={handleSignup}  type='submit'  className='font-bold bg-blue-500 p-2 rounded text-white cursor-pointer w-70 mt-5 mx-auto hover:bg-blue-800'>Sign Up</button>     
 
<h1 className='mt-10px text-blue-500 mx-auto'>Already have account? <Link to={"/login"}> <span className='font-semibold'>Login </span> </Link>here</h1>
</div>



    </div>
    </>
  )
}

export default Signup
