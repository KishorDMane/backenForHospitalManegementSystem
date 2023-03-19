const express = require('express');
const DepartmentRouter = express.Router();
const Department = require('../model/department.model');


// Get all departments
DepartmentRouter.get('/', async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
    
});

// Get department by ID
DepartmentRouter.get('/:id', async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: 'Department not found' });
        }
        res.json(department);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new department
DepartmentRouter.post('/', async (req, res) => {
    const { name, description,imgurl } = req.body;
    try {
        const department = await Department.create({ name, description,imgurl });
        res.json(department);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a department
DepartmentRouter.put('/:id', async (req, res) => {
    const { name, description,imgurl } = req.body;
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: 'Department not found' });
        }
        department.name = name;
        department.description = description;
        department.imgurl=imgurl
        await department.save();
        res.json(department);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a department
DepartmentRouter.delete('/:id', async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: 'Department not found' });
        }
        await department.destroy();
        res.json({ msg: 'Department removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { DepartmentRouter };
