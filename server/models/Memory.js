const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true
});

const Memory = mongoose.model('Memory', memorySchema);
module.exports = Memory;
