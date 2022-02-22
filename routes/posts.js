import express from 'express';

import {getPosts, createPost, updatePost} from '../controllers/posts.js';

const router = express.Router();

//first router is going to be a router .get
//instead localhost:5000/ it will be localhost:5000/posts
router.get('/', getPosts);
router.post('/', createPost);

//to create update route we use patch for update existing documents
//with :id

router.patch('/:id', updatePost);


export default router;