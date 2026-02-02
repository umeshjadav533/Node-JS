import express from 'express'

const app = express();

// const router = express.Router();

// 1. Application-level middleware
app.use((req, res, next) => {
    console.log("Time: ", Date().toString());
    next();
})

// 2. Router-level middleware
// router.use((req, res, next) => {
//   console.log("Time: ", Date().toString());
//   next()
// })

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>");
})

app.get('/about', (req, res) => {
    // res.sen("<h1>About page</h1>");
    res.send("<h1>About page</h1>");
})

// 3. Error-handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Somthing Broke!");
    next();
})

// =========router level middleware part=========
// router.get('/',  (req, res) => {
//     res.send("<h1>Home Page</h1>");
// })

// router.get('/about', (req, res) => {
//     res.send("<h1>About page</h1>");
// })
// app.use('/', router);

app.listen(3000, () => {
    console.log('Server Running on Port 3000');
});


// 4. Built-in middleware
// express.static()
// express.urlencoded()
// express.json()

// 5. Third-party middleware
// cookie-parser()