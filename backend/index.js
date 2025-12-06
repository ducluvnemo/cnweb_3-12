const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/student_db';
mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected:", mongoUrl))
  .catch(err => console.log("MongoDB error:", err));

const Student = require('./models/Student');

// Get all
app.get('/api/students', async (req, res) => {
  const list = await Student.find();
  res.json(list);
});

// Create
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await Student.create({
      name: req.body.name,
      age: req.body.age,
      stuClass: req.body.stuClass
    });
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
app.put('/api/students/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        stuClass: req.body.stuClass
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
app.delete('/api/students/:id', async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted", id: deleted._id });
});

// Serve React build (optional)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('Server running on ' + PORT));
