const express = require('express');
const cors = require('cors');
const Memory = require('./models/Memory'); // Mongoose model

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

// GET: Fetch all memories
app.get('/api/memories', async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch memories', error: error.message });
  }
});

// POST: Create and save a memory to MongoDB
app.post('/api/memories', async (req, res) => {
  const { title, content, date, user } = req.body;

  if (!title || !content || !date || !user) {
    return res.status(400).json({ message: 'All fields including user ID are required' });
  }

  try {
    const newMemory = await Memory.create({ title, content, date, user });
    res.status(201).json({ message: 'Memory created with user reference', data: newMemory });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// PUT: Update a memory by ID (minor update added)
app.put('/api/memories/:id', async (req, res) => {
  console.log(`🔄 Attempting to update memory with ID: ${req.params.id}`); // Minor update

  try {
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMemory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.json({ message: 'Memory updated successfully', data: updatedMemory }); // Changed message
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

module.exports = app;
