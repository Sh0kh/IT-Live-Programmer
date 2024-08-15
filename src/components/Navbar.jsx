import React, { useState } from 'react'
import Language from  '/images/Language.png'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
function Navbar() {
  const [IsActive, setActive] = useState(false)
  const NavModal = () =>{
    setActive(!IsActive)
  }
  const location = useLocation()
  const Dashboard = location.pathname === '/'
  const Payment = location.pathname === '/payments'

  return (
    <div className='NavBar w-full relative' >
      <div className='flex items-center  justify-between gap-[5px] w-full'>
        <form>
          <label htmlFor="" className='flex items-center  gap-[5px] py-[11px] px-[11px] bg-white rounded-[16px] border-[0.1px] border-[#B4B5B0] w-[400px]'> 
          <svg className='text-[24px] text-[#56565B]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"></path></svg>
          <input type="text" placeholder='Qidiruv' className='outline-none w-full text-[16px]' />
          </label>
        </form>
        <div className='flex gap-[21px] '>
          <button className='NavbarBtn bg-white rounded-[16px] border-[0.5px] border-[#B4B5B0] p-[9px] relative'>
          <svg className='text-[25px] text-[#C2C7CE]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.645 20.5a3.502 3.502 0 0 0 6.71 0zM3 19.5h18v-3l-2-3v-5a7 7 0 1 0-14 0v5l-2 3z"></path></svg>
          <span className='absolute top-[-10px] right-[-10px] bg-[#3AACCF] px-[8px] py-[1px] rounded-[50px] text-white'>
            2
          </span>
          </button>
          <button className='NavbarBtn bg-white rounded-[16px] border-[0.5px] border-[#B4B5B0] p-[9px]'>
              <img className='w-[28px] h-[28px]' src={Language} alt="" />
          </button>
        </div>
        <button className='burger text-[30px] hidden'  onClick={NavModal}>
        <svg  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18"></path></svg>
        </button>
      </div>
      <div className={`${IsActive ? 'NavBarActive' : ''} NavBarModal fixed bg-customBg top-[0px] left-[0px] right-[0px] bottom-[] px-[25px] py-[30px] flex justify-between `}>
          <nav>
            <NavLink to='/' onClick={NavModal} className={`flex gap-[8px] mb-[15px] p-[5px] ${Dashboard ? 'bg-btnColor  rounded-[10px]' : ''}`}>
            <svg className={`h-7 w-7 text-white `} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 12l8-8l8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"></path></svg>
            <span className='text-white font-montserrat'>
            Asosiy
            </span>
            </NavLink>
            <NavLink  to='/payments' onClick={NavModal} className={`flex gap-[8px] mb-[15px] p-[5px]  ${Payment ? 'bg-btnColor  rounded-[10px]' : ''}`}>
            <svg className="h-5 w-5  text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 8V6H7v2zm0 8v-5H7v5zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2zM3 20h15v2H3a2 2 0 0 1-2-2V9h2z"></path></svg>
            <span className='text-white font-montserrat'>
            To’lovlar 
            </span>
            </NavLink>
          </nav>
          <button className='h-[30px]'>
          <svg onClick={NavModal} className='text-[30px] text-btnColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9s9-4.038 9-9s-4.037-9-9-9m0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7s7 3.14 7 7s-3.141 7-7 7m.707-7l2.646-2.646a.5.5 0 0 0 0-.707a.5.5 0 0 0-.707 0L12 11.293L9.354 8.646a.5.5 0 0 0-.707.707L11.293 12l-2.646 2.646a.5.5 0 0 0 .707.708L12 12.707l2.646 2.646a.5.5 0 1 0 .708-.706z"></path></svg>
          </button>
      </div>
    </div>
  )
}

export default Navbar