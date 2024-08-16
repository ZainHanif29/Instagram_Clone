import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import pic from '/pic-1.jpg'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({ open, setOpen }) => {

  const [text, setText] = useState("");
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText)
    } else {
      setText('')
    }
  }
  return (
    <>
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">

          <div className="flex flex-1">

            <div className="w-1/2">
              <img
                src={pic} alt="pic"
                className='rounded-l-lg my-2 w-full aspect-square object-cover'
              />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">

                <div className="flex gap-3 items-center">
                  <Link>
                    <Avatar>
                      <AvatarImage src="" alt="post_img" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="">
                    <Link className='font-semibold text-sm'>username</Link>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className='cursor-pointer' />
                  </DialogTrigger>
                  <DialogContent>
                    <div>unfollow</div>
                    <div>unfollow</div>
                    <div>unfollow</div>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                Comments
              </div>
              <div className="p-4">
                <div className='flex items-center gap-2'>
                  <input
                    type="text"
                    onChange={changeEventHandler}
                    value={text}
                    placeholder='add to comment...'
                    className='outline-none text-sm w-full border border-gray-300 p-2 rounded-lg'
                  />
                  <Button disabled={text.trim()} onClick={()=>alert(text)} variant="outline">send</Button>
                </div>
              </div>

            </div>

          </div>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default CommentDialog