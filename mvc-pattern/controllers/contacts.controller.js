import mongoose from "mongoose";
import contact from "../models/contact.model.js";

const getContacts = async (req, res) => {
    const contacts = await contact.find();
    res.render("home", { contacts });
};

const showSingleContact = async (req, res) => {
    const singleContact = await contact.findById(req.params.id);
    res.render("show-contact", { singleContact });
};

const addContact = async (req, res) => {
    // await contact.insertOne({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address
    // });
    await contact.create(req.body)
    res.redirect("/")

};

const showupdatedContact = async (req, res) => {
    const singleContact = await contact.findById(req.params.id);
    res.render("update-contact", { singleContact });
};

const updateContact = async (req, res) => {
    await contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
};

const deleteContact = async (req, res) => {
    await contact.findByIdAndDelete(req.params.id, req.body);
    res.redirect('/');
};

export { getContacts, showSingleContact, addContact, showupdatedContact, updateContact, deleteContact }