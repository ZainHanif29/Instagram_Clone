import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { readFileAsDataURL } from '../lib/utils.js'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

const CreatePost = ({ open, setOpen }) => {
  const imgRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file)
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }
  const createPostHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    if (imagePreview) formData.append('image', file)
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message)
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="">
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader className="text-center font-semibold">create new post</DialogHeader>
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src="" alt="post img" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <div className="font-semibold text-xs">{user?.username}</div>
              <span className='text-gray-600 text-xs'>Bio here...</span>
            </div>
          </div>
          <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
          {
            imagePreview && (
              <div className='w-full h-64 flex items-center justify-center'>
                <img src={imagePreview} alt='post img' className='object-cover h-full w-full rounded-md' />
              </div>
            )
          }
          <input ref={imgRef} type="file" className='hidden' onChange={fileChangeHandler} />
          <Button onClick={() => imgRef.current.click()} className="capitalize w-fit mx-auto">select from the computer</Button>
          {
            imagePreview && (
              loading ? (
                <Button><Loader2 className="animate-spin mr-2 h-4 w-4" />Please wait</Button>
              ) : (
                <Button type="submit" onClick={createPostHandler}>Post</Button>
              )
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreatePost