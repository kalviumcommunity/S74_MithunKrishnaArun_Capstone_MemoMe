const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let memories = [
  { id: 1, title: 'First Memory', content: 'Hello future me!', date: '2025-06-01' },
  { id: 2, title: 'Second Memory', content: 'Keep going!', date: '2025-06-10' },
];

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/memories', (req, res) => {
  res.json(memories);
});

app.post('/api/memories', (req, res) => {
  const { title, content, date } = req.body;
  if (!title || !content || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newMemory = {
    id: Date.now(),
    title,
    content,
    date,
  };
  memories.push(newMemory);
  res.status(201).json({ message: 'Memory created', data: newMemory });
});

app.put('/api/memories/:id', (req, res) => {
  const memoryId = parseInt(req.params.id);
  const { title, content, date } = req.body;

  const memoryIndex = memories.findIndex(m => m.id === memoryId);
  if (memoryIndex === -1) {
    return res.status(404).json({ message: 'Memory not found' });
  }

  memories[memoryIndex] = {
    ...memories[memoryIndex],
    title: title || memories[memoryIndex].title,
    content: content || memories[memoryIndex].content,
    date: date || memories[memoryIndex].date,
  };

  res.json({ message: 'Memory updated', data: memories[memoryIndex] });
});

module.exports = app;
