import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments)
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    e.preventDefault();
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeORDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );
      console.log("called");
      console.log(res);

      if (res.data.success) {
        const updateLike = liked ? postLike - 1 : postLike + 1;
        setPostLike(updateLike);
        setLiked(!liked);

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
              ...p,
              likes: liked
                ? p.likes.filter((id) => id !== user._id)
                : [...p.likes, user._id],
            }
            : p
        );

        dispatch(setPosts(updatedPostData))

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        const updatedCommentData = [...comment,res.data.message];
        setComment(updatedCommentData);
        const updatedPostData = posts.map(p=>p._id===post._id?{...p,comments:updatedCommentData}:p);
        dispatch(setPosts(updatedPostData));
        setText('')
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

    }
  }

  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItems) => postItems._id != post?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="my-8 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://avatar.iran.liara.run/public/boy"
                alt="post_img"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>{post.author.username}</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="flex flex-col text-sm text-center items-center">
              <Button
                variant="Gost"
                className="cursor-pointer w-fit text-[red]"
              >
                Unfollow
              </Button>
              <Button variant="Gost" className="cursor-pointer w-fit">
                Add to favorities
              </Button>
              {user && user._id == post.author._id && (
                <Button
                  onClick={deletePost}
                  variant="Gost"
                  className="cursor-pointer w-fit"
                >
                  Delete
                </Button>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <img
          src={post.image}
          alt="pic"
          className="rounded-sm my-2 w-full aspect-square object-cover"
        />
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">

            {
              liked ? <Heart
                onClick={likeORDislikeHandler}
                className="cursor-pointer text-red-600"
              /> : <Heart
                onClick={likeORDislikeHandler}
                className="cursor-pointer hover:text-gray-600"
              />
            }

            <MessageCircle
              onClick={() => {
                dispatch(setSelectedPost(post));
                setOpen(true)
              }}
              className="cursor-pointer hover:text-gray-600"
            />
            <Send className="cursor-pointer hover:text-gray-600" />
          </div>
          <Bookmark className="cursor-pointer hover:text-gray-600" />
        </div>
        <span className="font-medium block mb-2">{postLike} Likes</span>
        <p>
          <span className="font-medium mr-2">{post.author.username}</span>
          {post.caption}
        </p>
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true)
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          View all {comment.length} comments
        </span>
        <CommentDialog open={open} setOpen={setOpen} />
        <div className="flex">
          <input
            type="text"
            value={text}
            onChange={changeEventHandler}
            placeholder="add to comment..."
            className="outline-none text-sm w-full"
          />
          {text && <span className="text-[#38ADF8] cursor-pointer" onClick={commentHandler}>Post</span>}
        </div>
      </div>
    </>
  );
};

export default Post;
