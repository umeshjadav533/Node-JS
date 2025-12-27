// 4 Types HTTP Request
//  1. get    2. post    3. put    4. delete

import express from 'express'
const app = express();
const PORT = 3000 || 6000;

// simple response
// http://localhost:3000/
app.get('/', (req, res) => {
    res.send("Hello World!");
})

// html response
http://localhost:3000/about
app.get('/about', (req, res) => {
    res.send("<h1>About Page</h1>");
})

// response with id
// http://localhost:3000/gallery/34
app.get("/gallery/:galleryid", (req, res) => {
    res.send(req.params);
    // res.send(req.params.galleryid);
})

// response with multiple id
http://localhost:3000/user/21/book/44
app.get("/user/:userid/book/:bookid", (req, res) => {
    res.send(req.params);
})

// response with 2 id but not extra route
// http://localhost:3000/photo/66-34
app.get("/photo/:photoid-:editorid", (req, res) => {
    res.send(req.params);
})

// response with search query
http://localhost:3000/search?name=umesh&&age=18
app.get("/search", (req, res) => {
    res.send(req.query);
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})