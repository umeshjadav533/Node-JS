import express, { Router } from 'express'
import Student from "../models/students.model.js";

const router = express.Router();

// get All Students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get Single Students
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).json({ message: "Students not Found." });
        res.send(student);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// add Students
router.post('/', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        if(!newStudent) return res.status(404).json({ message: "Students not Found." });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// update Students
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedStudent) return res.status(404).json({ message: "Students not Found." });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete Students
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if(!deletedStudent) return res.status(404).json({ message: "Students not Found." });
        res.json({ message: "Student Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router;