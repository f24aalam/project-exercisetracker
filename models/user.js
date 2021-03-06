const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    excercises : [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Excercise'
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);