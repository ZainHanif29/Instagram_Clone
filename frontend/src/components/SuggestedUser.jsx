import store from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUser = () => {
  const { suggestedUser } = useSelector(store => store.auth);
  return (
    <>
      <div className="my-10">
        <div className="flex items-center justify-between text-sm">
          <div className="font-semibold text-gray-600 pe-16">Suggested for you</div>
          <span className='font-medium cursor-pointer'>See All</span>
        </div>
        {
          suggestedUser?.map((user) => (
            <div key={user._id} className="flex items-center justify-between">
              <div  className="flex items-center gap-2">
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
              <span className='text-[#91c9ec] text-xs font-bold cursor-pointer hover:text-[#73b3dc]'>Follow</span>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SuggestedUser