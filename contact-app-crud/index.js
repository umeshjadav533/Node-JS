import express from 'express'
import dotenv from 'dotenv'
import contact from './models/contact.model.js';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

mongoose.connect(`${process.env.MONGODBURI}/contacts-crud`).then("Database Connected.");

// MiddleWares
app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.get("/", async (req, res) => {
    const contacts = await contact.find();
    res.render("home", { contacts });
})

app.get("/show-contact/:id", async (req, res) => {
    const singleContact = await contact.findById(req.params.id);
    res.render("show-contact", { singleContact });
})

app.get("/add-contact", (req, res) => { res.render("add-contact") })

app.post("/add-contact", async (req, res) => {
    // await contact.insertOne({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address
    // });
    await contact.create(req.body)
    res.redirect("/")
})

app.get("/update-contact/:id", async (req, res) => {
    const singleContact = await contact.findById(req.params.id);
    res.render("update-contact", { singleContact });
})

app.post("/update-contact/:id", async (req, res) => {
    await contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
})

app.get("/delete-contact/:id", async (req, res) => {
    await contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
})


app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
})