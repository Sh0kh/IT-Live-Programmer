import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className='MainLayout p-[30px] flex gap-[30px]'>
      <Sidebar/>
    <div className='w-full'>
    <Navbar/>
    <Outlet /> 
    </div>
  </div>
  )
}
