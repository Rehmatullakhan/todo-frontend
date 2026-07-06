import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

function Login() {
  const[userData, setUserData]= useState();
  const navigate = useNavigate();


  useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate('/');
    }
  })

  const handleLogin =async ()=>{
    console.log(userData);
 let result =await fetch('http://localhost:3200/login', {
      method:'POST',
      body:JSON.stringify(userData),
      headers: {
        'Content-Type':'Application/json'
      }
    });
    result =await result.json();
    if(result.success){
      console.log("user login");
   document.cookie='token='+result.token;
   localStorage.setItem('login', userData.email);
   window.dispatchEvent(new Event('localStorage-change'))
   navigate('/');
    }else{
      alert("try again");
    }
}

  return (
    <>
    <Navbar/>
    <div  className='flex flex-col justify-center items-center  mt-5'>

        <div  className='h-120 w-150 bg-white gap-1 p-1 rounded-2xl shadow-[0_20px_60px_10px_rgba(0,0,0,0.4)]  flex flex-col justify-center '>
     
    <h1 className='font-bold text-2xl mx-auto'>Login</h1>  
<div className='ml-20 flex flex-col gap-1 mt-5 '>
    
     <label htmlFor='email' className='font-bold pl-1'>Email:</label>
      <input onChange={(event)=>setUserData({...userData, email:event.target.value})}   type='text' id='email' name='email' autoComplete='email' placeholder='Enter Email' className='outline-none border rounded-[10px] border-gray-500 p-2 w-100'/>
   
     <label htmlFor='password' className='font-bold pl-1'>Password:</label>
      <input onChange={(event)=>setUserData({...userData, password:event.target.value})} type='text'  name='password' id='password' placeholder='Enter Password' className='outline-none border rounded-[10px] border-gray-500 p-2 w-100'/>
   
</div>
 <button  onClick={handleLogin}  className='font-bold bg-blue-500 p-2 rounded text-white cursor-pointer w-70 mt-5 mx-auto hover:bg-blue-800'>Login</button>     
 <h1 className='mt-10px text-blue-500 mx-auto'>Don't have an account? <Link to={"/signup"}> <span className='font-semibold'>Signup </span> </Link>here</h1>

</div>

    </div>
    </>

  )
}

export default Login
