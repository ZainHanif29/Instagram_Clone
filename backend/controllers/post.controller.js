import sharp from 'sharp'
import cloudinary from '../utils/cloudinary.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Comment from '../models/comment.model.js';
export const addPost = async (req, res) => {
    try {
        const authorID = req.id;
        const { caption } = req.body;
        const image = req.file;

        if (!image) return res.status(401).json({ message: 'Image required!', success: false });


        // Image upload
        const optimizedImage = await sharp(image.buffer).resize({ width: 800, height: 800, fit: 'fill' }).toFormat('jpeg', { quality: 80 }).toBuffer();

        // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImage.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader(fileUri);
        const post = await Post.create({
            caption, image: cloudResponse.secure_url, author: authorID
        });
        const user = await User.findById(authorID);
        if (user) {
            user.posts.push(post._id);
            await user.save()
        }

        await post.populate({ path: 'author', select: '-password' });
        return res.status(201).json({
            message: 'New post added.',
            post,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getUserPost = async (req, res) => {
    try {
        const authorID = req.id;
        const posts = await Post.find({ _id: authorID }).sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (req, res) => {
    try {
        const userID = req.id;
        const postID = req.params.id;
        const post = await Post.findById(postID);
        if (!post) return res.status(401).json({ message: 'Post not found', success: false });

        await post.updateOne({ $addToSet: { likes: userID } });
        await post.save();
        // socket io
    } catch (error) {
        console.log(error);

    }
}

export const dislikePost = async (req, res) => {
    try {
        const userID = req.id;
        const postID = req.params.id;
        const post = await Post.findById(postID);
        if (!post) return res.status(401).json({ message: 'Post not found', success: false });

        await post.updateOne({ $pull: { likes: userID } });
        await post.save();
        // socket io
    } catch (error) {
        console.log(error);

    }
}

export const addComment = async (req, res) => {

    try {
        const userID = req.id;
        const postID = req.params.id;
        const { text } = req.body;

        const post = await Post.findById(postID);
        if (!text) return res.status(401).json({ message: 'comment required', success: false });

        const comment = await Comment.create({
            text, author: userID, post: postID
        }).populate({
            path: 'author',
            select: 'username profilePicture'
        });

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message: 'Comment Added',
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCommentsOfPost = async (req,res) => {
    try {
        const postId = req.params.id;

        const comments = await Comment.find({post:postId}).populate('author', 'username profilePicture');

        if(!comments) return res.status(404).json({message:'No comments found for this post', success:false});

        return res.status(200).json({success:true,comments});

    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Post not found', success:false});

        // check if the logged-in user is the owner of the post
        if(post.author.toString() !== authorId) return res.status(403).json({message:'Unauthorized'});

        // delete post
        await Post.findByIdAndDelete(postId);

        // remove the post id from the user's post
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        // delete associated comments
        await Comment.deleteMany({post:postId});

        return res.status(200).json({
            success:true,
            message:'Post deleted'
        })

    } catch (error) {
        console.log(error);
    }
}

export const bookmarkPost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Post not found', success:false});
        
        const user = await User.findById(authorId);
        if(user.bookmarks.includes(post._id)){
            // already bookmarked -> remove from the bookmark
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'unsaved', message:'Post removed from bookmark', success:true});

        }else{
            // bookmark krna pdega
            await user.updateOne({$addToSet:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'saved', message:'Post bookmarked', success:true});
        }

    } catch (error) {
        console.log(error);
    }
}