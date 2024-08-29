import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import pic from "/pic-1.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import Comment from "./Comment";
import { toast } from "sonner";
import axios from "axios";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const {selectedPost} = useSelector(store=>store.post)
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

    const commentHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        setText('')
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="max-w-5xl p-0 flex flex-col"
        >
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src={selectedPost?.image}
                alt="pic"
                className="rounded-l-lg my-2 w-full aspect-square object-cover"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex gap-3 items-center">
                  <Link>
                    <Avatar>
                      <AvatarImage src={selectedPost?.author?.profilePicture} alt="post_img" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="">
                    <Link className="font-semibold text-sm">{selectedPost?.author?.username}</Link>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <div>unfollow</div>
                    <div>unfollow</div>
                    <div>unfollow</div>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {
                  selectedPost?.comments.map((comment)=>(
                    <Comment key={comment._id} comment={comment} />
                  ))
                }

                <div>{selectedPost.comments.text}</div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    onChange={changeEventHandler}
                    value={text}
                    placeholder="add to comment..."
                    className="outline-none text-sm w-full border border-gray-300 p-2 rounded-lg"
                  />
                  <Button
                    disabled={!text.trim()}
                    onClick={commentHandler}
                    variant="outline"
                  >
                    send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentDialog;
