const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Memory = require('./models/Memory');
const User = require('./models/user');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'memome_secret_key';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: token missing' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
};

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

// POST: Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET: Fetch all memories
app.get('/api/memories', authenticate, async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.user.id }).sort({ date: 1, createdAt: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch memories', error: error.message });
  }
});

// POST: Create and save a memory to MongoDB
app.post('/api/memories', authenticate, async (req, res) => {
  const { title, content, date } = req.body;

  if (!title || !content || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMemory = await Memory.create({ title, content, date, user: req.user.id });
    res.status(201).json({ message: 'Memory created successfully', data: newMemory });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// PUT: Update a memory by ID (minor update added)
app.put('/api/memories/:id', authenticate, async (req, res) => {
  console.log(`🔄 Attempting to update memory with ID: ${req.params.id}`); // Minor update

  try {
    const updatedMemory = await Memory.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
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

// DELETE: Remove a memory by ID
app.delete('/api/memories/:id', authenticate, async (req, res) => {
  try {
    const deletedMemory = await Memory.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!deletedMemory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.json({ message: 'Memory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = app;
