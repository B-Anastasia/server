import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res)=>{
    try {
        // find all documents

        const postMessages = await PostMessage.find();
        console.log('😸 ~ postMessages', postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

export const createPost = async (req, res)=>{
    const body = req.body;
    const newPost = new PostMessage(body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
        
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const updatePost = async (req, res)=>{
    const {id: _id} = req.params;
    const post = req.body;
    //check if this underscore id is not really a mongoose object id send 404 error with Express
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
    res.status(200).json(updatedPost);
}
