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
      default: Date.now,
      get: v => (new Date(v)).toDateString()
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
},{
    timestamps: true,
    toJSON: { getters: true, virtuals: false, }
})

module.exports = mongoose.model('Excercise', ExcerciseSchema);