import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MessagesComp = ({ selectedUser }) => {
    return (
        <div className="overflow-y-auto flex-1 p-4">
            <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                        <AvatarFallback className="text-3xl">
                            {selectedUser?.username[0]}
                        </AvatarFallback>
                    </Avatar>
                    <span>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="h-8 my-2" variant="secondary">
                            View profile
                        </Button>
                    </Link>
                </div>
            </div>
            {
                [1, 2, 3, 4].map((msg) => (
                    <>
                        <div className="flex">
                        <div>{msg}</div>
                        </div>
                    </>
                ))
            }
        </div>
    );
};

export default MessagesComp;
