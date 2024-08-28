import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";

const LeftSideBar = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();

    const sideBarItems = [
        { Icon: <Home />, text: "Home" },
        { Icon: <Search />, text: "Search" },
        { Icon: <TrendingUp />, text: "Explore" },
        { Icon: <MessageCircle />, text: "Messages" },
        { Icon: <Heart />, text: "Notification" },
        { Icon: <PlusSquare />, text: "Create" },
        {
            Icon: (
                <Avatar className="w-6 h-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile",
        },
        { Icon: <LogOut />, text: "Logout" },
    ];
    const sideBarHandler = (textType) => {
        if (textType === "Logout") {
            logoutHandler();
        } else if (textType == "Create") {
            setOpen(true)
        } else {
            console.log(textType);
            toast.success(textType)

        }
    };
    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setAuthUser(null))
                toast.success(res.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred during logout.';
            toast.error(errorMessage);
        }
    };
    return (
        <>
            <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
                <div className="flex flex-col">
                    <h1 className="my-8 pl-3 font-bold text-xl">Logo.</h1>
                    {sideBarItems.map((item, index) => {
                        return (
                            <div
                                className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
                                key={index}
                                onClick={() => sideBarHandler(item.text)}
                            >
                                {item.Icon}
                                <span>{item.text}</span>
                            </div>
                        );
                    })}
                </div>
                <CreatePost open={open} setOpen={setOpen} />
            </div>
        </>
    );
};

export default LeftSideBar;
