import store from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'

const RightSideBar = () => {
  const { user } = useSelector(store => store.auth)
  return (
    <>
 

    </>
  )
}

export default RightSideBar