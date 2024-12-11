const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    category: [
      {
        type: String,
        required: true,
        unique: true,
      }
    ]
});

module.exports = mongoose.model('category', categoriesSchema);
