import express from 'express'

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("Home Page");
})

app.get('/myform', (req, res) => {
    res.render('myform');
})

app.listen(3000, () => {
    console.log("Server Running on port 3000");
})