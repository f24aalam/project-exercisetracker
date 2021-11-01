const mongoose = require('mongoose');
const ExcerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: '{PATH} is required!'
    },
    duration: {
      type: Number,
      required: '{PATH} is required'
    },
    date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Excercise', ExcerciseSchema);