const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      quantity: {
        type: Number,
        required: true,
        min: 0
      },
      description: String,
      category: String,
      dateAdded: {
        type: Date,
        default: Date.now
      }
})

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;