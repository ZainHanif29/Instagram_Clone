import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUser from '@/hooks/useGetSuggestedUser'
import RightSideBar from './RightSideBar'

const Home = () => {
  useGetAllPost();
  useGetSuggestedUser();
  return (
    <>
      <div className='flex'>
        <div className='flex-grow'>
          <Feed />
          <Outlet />
        </div>
        <RightSideBar />
      </div>

    </>
  )
}

export default Home