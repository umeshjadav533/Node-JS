import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set("view engine", 'ejs');

app.use(cookieParser());
const csrfProtaction  = csrf({cookie: true});

app.get("/", (req,res) => {
    res.send("<h1>Home page</h1>");
})

app.get("/myform", csrfProtaction, (req,res) => {
    res.render("myform", { csrfToken : req.csrfToken()});
})

app.post('/submit', csrfProtaction, (req,res)=>{
    res.send(req.body);
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})