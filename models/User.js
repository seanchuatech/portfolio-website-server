import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    User: {
        type: Number,
        default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  refreshToken: String

});

export const User = mongoose.model('User', userSchema);