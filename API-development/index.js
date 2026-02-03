import express from 'express'
import connectDB from './config/database.js';
import router from './routes/students.routes.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
connectDB();
const port = 3000 || process.env.PORT

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/student', router);

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})