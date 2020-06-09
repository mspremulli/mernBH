const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type:String,
    required: true
  },
  lastLogin: {
    type: Date
  }
},
{timestamps: {}}
);


module.exports = User = mongoose.model('users', userSchema);