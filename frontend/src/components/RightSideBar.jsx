import store from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import SuggestedUser from './SuggestedUser'

const RightSideBar = () => {
  const { user } = useSelector(store => store.auth)
  return (
    <>
      <div className="w-fit my-10 pr-32">
        <div className="flex items-center gap-2">
          <Link to={`/profile/${user._id}`}>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt='user img' />
              <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <div className="font-semibold text-sm"><Link to={`/profile/${user._id}`}>{user?.username}</Link></div>
            <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
          </div>
        </div>
        <SuggestedUser />
      </div>

    </>
  )
}

export default RightSideBar