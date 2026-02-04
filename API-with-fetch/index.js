import express from 'express'
import connectDB from './config/database.js';
import router from './routes/students.routes.js';
import dotenv from 'dotenv';
import multer from 'multer'
import cors from 'cors'
import path from 'path'

const app = express();
dotenv.config();
connectDB();

const port = 3000 || process.env.PORT

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join((process.cwd(), 'uploads'))))
app.use(cors());
// Routes
app.use('/api/student', router);

app.use((error,req, res, next) => {
    if(error instanceof multer.MulterError){
        return res.status(400).send(`Image Error: ${error.message} : ${error.code}`);
    }else{
        return res.status(500).send(`Somthing went wrong: ${error.message}`);
    }
})
app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})