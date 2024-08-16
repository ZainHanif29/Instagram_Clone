import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home'

const MainLayout = () => {
  return (
    <>
      <div className="">
        <div className='text-center font-bold text-5xl text-blue-900'>MainLayout</div>
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout