import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import pic from '/pic-1.jpg'
import CommentDialog from './CommentDialog'

const Post = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false)

  const changeEventHandler = (e) => {
    e.preventDefault();
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText)
    } else {
      setText("")
    }
  }

  return (
    <>
      <div className="my-8 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="" alt="post_img" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>username</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className='cursor-pointer' />
            </DialogTrigger>
            <DialogContent className="flex flex-col text-sm text-center items-center">
              <Button variant="Gost" className="cursor-pointer w-fit text-[red]">Unfollow</Button>
              <Button variant="Gost" className="cursor-pointer w-fit">Add to favorities</Button>
              <Button variant="Gost" className="cursor-pointer w-fit">Delete</Button>
            </DialogContent>
          </Dialog>
        </div>
        <img
          src={pic} alt="pic"
          className='rounded-sm my-2 w-full aspect-square object-cover'
        />
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            <Heart className='cursor-pointer hover:text-gray-600' />
            <MessageCircle onClick={()=>setOpen(true)} className='cursor-pointer hover:text-gray-600' />
            <Send className='cursor-pointer hover:text-gray-600' />
          </div>
          <Bookmark className='cursor-pointer hover:text-gray-600' />
        </div>
        <span className='font-medium block mb-2'>1M Likes</span>
        <p>
          <span className='font-medium mr-2'>username</span>
          caption
        </p>
        <span onClick={()=>setOpen(true)} className='cursor-pointer text-sm text-gray-400'>View all 1K comments</span>
        <CommentDialog open={open} setOpen={setOpen} />
        <div className="flex">
          <input
            type="text"
            value={text}
            onChange={changeEventHandler}
            placeholder='add to comment...'
            className='outline-none text-sm w-full'
          />
          {
            text && <span className='text-[#38ADF8]'>Post</span>
          }

        </div>
      </div>
    </>
  )
}

export default Post