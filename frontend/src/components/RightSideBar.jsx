import store from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

const RightSideBar = () => {
  const {user} = useSelector(store=>store.auth)
  return (
    <>
    {
      user ? <div>{user._id}</div> : <div>id?</div>
    }

    </>
  )
}

export default RightSideBar