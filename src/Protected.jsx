import React from 'react'
import { Navigate } from 'react-router-dom'

function Procteted({children}) {
    if(!localStorage.getItem('login')){
        return <Navigate to="/login" replace/>
    }
  return (
 children
  )
}

export default Procteted
