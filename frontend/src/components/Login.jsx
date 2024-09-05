import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthUser, setSelectedUser, setSuggestedUser, setUserProfile } from "@/redux/authSlice";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const signupHandler = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();
      const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        
        toast.success(res.data.message)
        dispatch(setAuthUser(res.data.user))
        setInput({
          email: "",
          password: "",
        })
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }

  };

  useEffect(()=>{
    dispatch(setSuggestedUser(null))
    dispatch(setUserProfile(null))
    dispatch(setPosts(null))
    dispatch(setSelectedPost(null))
    dispatch(setSelectedUser(null))
    dispatch(setAuthUser(null))
  });
  return (
    <>
      <div className="flex items-center w-screen h-screen justify-center">
        <form
          className="shadow-lg flex flex-col gap-5 p-8"
          onSubmit={signupHandler}
        >
          <div className="my-5">
            <h1 className="text-center font-bold text-xl">LOGO</h1>
            <p className="text-sm text-center">Login to see photos & videos fromyour friends</p>
          </div>

          <div>
            <span className="font-medium">Email</span>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </div>
          <div>
            <span className="font-medium">Password</span>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </div>
          {
            loading ? (<Button><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...</Button>) : (<Button type="submit">Login</Button>)
          }

          <span className="text-center">Don't have an account? <Link to='/signup' className="text-blue-600">Signup</Link></span>
        </form>
      </div>
    </>
  );
};

export default Login;
