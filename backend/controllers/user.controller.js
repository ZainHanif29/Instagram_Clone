import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing, Please check!",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Try different email!",
                success: false,
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashPassword,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            message: "Something is missing, Please check!",
            success: false,
        });
    }

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            message: "Incorrect email or password.",
            success: false,
        });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        return res.status(401).json({
            message: "Incorrect email or password.",
            success: false,
        });
    }

    user = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        posts: user.posts,
    };

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "id",
    });
    return res
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        })
        .json({
            message: `Welcome Back ${user.username}`,
            success: true,
            user,
        });
};

export const logout = async (_, res) => {
    try {
        return res.cookie("token", '', { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById({ userId });
        return res.status(200).json({ user, success: true })
    } catch (error) {
        console.log(error);

    }
}

export const editProfile = async (req, res) => {
    try {
        const userID = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;
        if (profilePicture) {
            const fileUri = getDataUri(profilePicture)
            cloudResponse = await cloudinary.uploader.upload(fileUri)
        }

        const user = await User.findById(userID)
        if(!user){
            return res.status(404).json({
                message:'User not found',
                success:false
            })
        }
        if(bio) user.bio = bio;
        if(gender) user.gender = gender;
        if(profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();
        return res.status(201).json({
            message:'Profile updated',
            success:true,
            user
        })

    } catch (error) {
        console.log(error);

    }
}

export const getSuggestedUser = async (req,res)=>{
    try {
        const suggestedUsers = await User.find({_id:{$ne:req.id}}).select('-password');
        if(!suggestedUsers){
            return res.status(400).json({
                message:'Currently don\'t have any users',
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user:suggestedUsers
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const followOrUnfollow = async(req,res)=>{
    try {
        const followkernaywala = req.id; //me
        const jiskofollowkarunga = req.params.id; //xyz

        if(followkernaywala == jiskofollowkarunga){
            return res.status(400).json({
                message:'You can\'t follow/unfollow yourself',
                success:false
            })
        }

        const user = await User.findById(followkernaywala);
        const targetUser = await User.findById(jiskofollowkarunga);
        if(!user || !targetUser){
            return res.status(400).json({
                message:'user not found',
                success:false
            })
        }

        // follow/unfollow logic
        const isFollowing = user.following.includes(jiskofollowkarunga);
        if(isFollowing){
            // unfollow logic
            await Promise.all([
                User.updateOne({_id:followkernaywala},{$pull:{following:jiskofollowkarunga}}),
                User.updateOne({_id:jiskofollowkarunga},{$pull:{followers:followkernaywala}})
            ])
            return res.status(200).json({message:"unfollowed successfully",success:true})
        }else{
            await Promise.all([
                User.updateOne({_id:followkernaywala},{$push:{following:jiskofollowkarunga}}),
                User.updateOne({_id:jiskofollowkarunga},{$push:{followers:followkernaywala}})
            ]) 
            return res.status(200).json({message:"followed successfully",success:true}) 
        }



    } catch (error) {
        console.log(error);
        
    }
}