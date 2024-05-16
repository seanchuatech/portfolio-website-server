import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String,
    required: true
  },
  techStack: {
    type: String,
    required: true
  },

});

export const User = mongoose.model('Project', projectSchema);