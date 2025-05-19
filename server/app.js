const express = require('express');
const cors = require('cors');
const Memory = require('./models/Memory');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// GET: Fetch all memories
app.get('/api/memories', async (req, res) => {
  const memories = await Memory.find();
  res.json(memories);
});

// POST: Create a memory and save to DB
app.post('/api/memories', async (req, res) => {
  const { title, content, date } = req.body;

  if (!title || !content || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMemory = await Memory.create({ title, content, date });
    res.status(201).json({ message: 'Memory created', data: newMemory });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT: Update a memory by ID
app.put('/api/memories/:id', async (req, res) => {
  try {
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMemory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.json({ message: 'Memory updated', data: updatedMemory });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

module.exports = app;
