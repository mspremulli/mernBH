// first & last name, name, city,state,avatar,userid, github, twitter, bio, dateupdated
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: String,
  state: String,
  avatar: String,
  github: String,
  twitter: String,
  bio: String
  
},
{timestamps: {}}
);


module.exports = Profile = mongoose.model('profiles', profileSchema);