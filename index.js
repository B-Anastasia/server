import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postsRoutes from './routes/posts.js';

const app = express();
dotenv.config();
//it is start of the routes (prefix)

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postsRoutes);

// const CONNECTION_URL = 'mongodb+srv://main-user_1:010203qW@cluster0.qofph.mongodb.net/memories?retryWrites=true&w=majority';
// on Mac disable AirPlay, because macOS Monterey started to listen to port 5000
// System Preferences > Sharing > untick AirPlay Receiver
// const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('Connected to memories API')
})

const PORT = process.env.PORT || 8000;
// to avoid an errors  {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000})
    .then(()=>app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log(error));

mongoose.set('useFindAndModify', false); //to avoid an error