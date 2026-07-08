import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { data, Link } from 'react-router-dom';


function List() {
const [listData , setListData] = useState([]);
const [selectedTask, setSelectedTask]= useState([]);


useEffect(()=>{
getListData();
},[]
)

const getListData=async ()=>{
    let res =await fetch("https://todo-backend-production-ea20.up.railway.app/tasks",{
      method:"GET",
      credentials:'include',
      headers:{"Content-Type":"application.json"}
    });
  let data=await res.json();
    if(res.ok && data.success){
       setListData(data.result); 
    }else{
      alert("please fill ..... the form");
    }

}
const deleteTask =async (id)=>{
     let item =await fetch('https://todo-backend-production-ea20.up.railway.app/delete/'+id, {method:'DELETE', credentials:'include'});
    item=await item.json();
    if(item.success){
getListData();}
else{
      alert(data.message || "Unauthorized, Please login again");
    }
}

const handleDeleteAll = async () =>{
    await fetch('https://todo-backend-production-ea20.up.railway.app/delete-all/',{method:'DELETE',
       credentials:'include',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({ids:selectedTask})
    })
    getListData();
    setSelectedTask([]);
}


const selectAll = (e)=>{
if(e.target.checked){
    let items = listData.map((item)=>
    item._id)
     setSelectedTask(items);
}
else{
    setSelectedTask([]);
}
}

const selectSingleItem= (id)=>{

if(selectedTask.includes(id)){
    let items = selectedTask.filter((item)=>item!=id);
    setSelectedTask(items);
}else{
    setSelectedTask([id,...selectedTask]);
}
}


  return (
    <div>
   <Navbar/>
   <div className='mt-12.5'>
    <h1 className='text-2xl text-black font-bold text-center w-full'>ToDO List</h1>
   <div className='overflow-x-auto shadow-lg rounded-b-lg p-5'>
          <table className='min-w-full bg-white'>
            <thead className='bg-gray-100'>
              <tr >
             <th className='border border-gray-300 px-4 py-3 text-center w-20'>
             <button  onClick={handleDeleteAll} className='bg-orange-600 px-2 py-1 text-white font-bold text-[15px] hover:bg-orange-700 cursor-pointer rounded-[5px]'>Delete All</button>
             <input onChange={selectAll} type='checkbox' checked={listData?.length >=0 && selectedTask?.length === listData?.length}/>
             </th>
                <th className='border border-gray-300 px-4 py-3 text-center w-20'>Task No</th>
                <th className='border border-gray-300 px-4 py-3 text-center'>Task Title</th>
                <th className='border border-gray-300 px-4 py-3 text-center'>Task Description</th>
                 <th className='border border-gray-300 px-4 py-3 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {listData && listData?.length === 0 ? (
                <tr>
                  <td colSpan="3" className='text-center py-4 text-gray-500'>No tasks found</td>
                </tr>
              ) : (
              listData &&  listData?.map((item, i) => (
                  <tr key={item._id} className='hover:bg-gray-50'>
                    <td className='border border-gray-300 px-4 py-2 text-center font-bold'><input onChange={()=>selectSingleItem(item._id)}
                    checked={selectedTask.includes(item._id)} type='checkbox'/></td>
                    <td className='border border-gray-300 px-4 py-2 text-center font-bold'>{i + 1}</td>
                    <td className='border border-gray-300 px-4 py-2 font-semibold'>{item.title}</td>
                    <td className='border border-gray-300 px-4 py-2'>{item.desc}</td>
                    <td className='border border-gray-300 px-4 py-2'>
                        <button onClick={()=>deleteTask(item._id)} className='bg-orange-600 px-2 py-1 text-white font-bold text-[15px] hover:bg-orange-700 cursor-pointer rounded-[5px]'>Delete</button>
                       <Link to={"/update/"+item._id}><button className='ml-1.5 bg-orange-600 px-2 py-1 text-white font-bold text-[15px] hover:bg-orange-700 cursor-pointer rounded-[5px]'>Update</button></Link></td>      
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
   </div>
   
    </div>
  )
}

export default List
