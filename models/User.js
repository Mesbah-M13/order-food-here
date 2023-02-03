const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "name is require"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is require"],
    unique: true,
  },
  password: {
    type: String,
    required:[true,'password is require'],
    min: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports  = mongoose.model("User",UserSchema)
