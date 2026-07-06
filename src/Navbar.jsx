import React, { useEffect, useState } from "react";
import { Link, Navigate, replace, useNavigate } from "react-router-dom";

function Navbar() {
  const [login , isLogin]= useState(localStorage.getItem('login'));
const navigate = useNavigate();
  const logoutHandler= ()=>{
    localStorage.removeItem('login');
  isLogin(null);
 setTimeout(()=>{
 navigate('/login');
 },0)
  }

  useEffect(()=>{
    const handleStorage= ()=>{
      isLogin(localStorage.getItem('login'));
    }
    window.addEventListener("localStorage-change",handleStorage);
    return ()=>{
       window.removeEventListener("localStorage-change",handleStorage);
    }
  })
  return (
    <nav className="flex justify-around bg-black gap-150 h-17 text-white items-center text-2xl font-bold">
      <div><Link to={'/'}>TODO App</Link></div>
      <ul className="flex  w-80 justify-between">
      {login? 
      <>
        <li>
          <Link to={"/"}>List</Link>
        </li>
        <li>
          <Link to={"/add"}>Add Task</Link>
        </li>
          <li>
          <Link onClick={logoutHandler}>Logout</Link>
        </li>
      </>
    : null}
       </ul>
    </nav>
  );
}

export default Navbar;
