import store from '@/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { setSelectedUser } from '@/redux/authSlice'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MessageCircleCode } from 'lucide-react'
import MessagesComp from './MessagesComp'

const ChatPage = () => {
    const dispatch = useDispatch();
    const {user , suggestedUser , selectedUser} = useSelector(store=>store.auth)
    const isOnline = false;
  return (
    <div className="flex h-screen ml-[16%]">
        <section className='w-full md:w-1/4 my-8'>
            <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
            <hr className='mb-4 border-gray-300' />
            <div className="overflow-y-auto h-[60vh]">
                {
                    suggestedUser?.map((user)=>(
                        <div key={user._id} onClick={()=> dispatch(setSelectedUser(user))}  className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                            <Avatar className='w-14 h-14'>
                            <AvatarImage src={user.profilePicture} />
                            <AvatarFallback>{user.username[0].toString()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className='font-medium'>{user?.username}</span>
                            <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>{isOnline ? 'online':'offline'}</span>
                        </div>
                        </div>
                    ))
                }
            </div>
        </section>
        {
            selectedUser ? (<>
            <section className='flex-1 border-l border-l-gray-100 flex flex-col h-full'>
                <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-100 sticky top-0 bg-white z-10'>
                    <Avatar>
                        <AvatarImage src={selectedUser?.profilePicture} />
                        <AvatarFallback>{selectedUser?.username[0].toString()}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span>{selectedUser?.username}</span>
                    </div>
                </div>
                <MessagesComp selectedUser = {selectedUser} />
                <div className='flex'> 
                    <Input type="text" className='flex-1 mr-2 focus-visible:ring-transparent' placeholder='Messages...' />
                    <Button>Send</Button>
                </div>
            </section>
            </>):(<>
            <div className='flex flex-col items-center justify-center mx-auto'>
                <MessageCircleCode className='w-32 h-32 my-4' />
                <h1 className='font-medium text-xl'>Your Messages</h1>
                <span>Send a message to start a chat.</span>
            </div>
            </>)
        }
    </div>
  )
}

export default ChatPage