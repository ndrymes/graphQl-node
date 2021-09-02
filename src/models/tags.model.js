const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    index: true,
  },
});

module.exports = mongoose.model('tags', TagsSchema);
