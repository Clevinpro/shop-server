const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const userSchema = new Schema(
  {
    email: { type: String, unique : true, required : true, dropDups: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

userSchema.plugin(timestamp);

const User = mongoose.model('User', userSchema);

module.exports = User;
