const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/memories', (req, res) => {
  const sampleMemories = [
    { id: 1, title: 'First Voice Note', content: 'Hey future me!', date: '2025-06-01' },
    { id: 2, title: 'Second Memory', content: 'Don’t forget to smile.', date: '2025-06-10' },
  ];

  res.json(sampleMemories);
});

module.exports = app;
