import { Project } from "../models/Project.js";
import mongoose from "mongoose"; 

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    if (projects.length === 0) return res.status(204).json({ 'message': 'No projects found' });
    
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
    // res.status(500).json({ message: 'Internal server error' }); // Generic error message for the client (production)
  }
}

const createNewProject = async (req, res) => {
  if (!req?.body?.title || !req?.body?.description || !req?.body?.imageUrl || !req?.body?.githubUrl || !req?.body?.techStack) {
    return res.status(400).json({ 'message': 'There\'s a missing field!' });
  }

  // Check for duplicate title in DB
  const duplicate = await Project.findOne({ title: req.body.title}).exec();
  if (duplicate) return res.sendStatus(409) // Conflict

  try {
    const result = await Project.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      githubUrl: req.body.githubUrl,
      techStack: req.body.techStack,
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
}

const getProject = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Project ID required!" });
  
  try {
    // Validate ID format using Mongoose's ObjectId.isValid()
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const project = await Project.findById(req.params.id).exec();
    if (!project) {
      return res.status(404).json({ message: `Project ID ${req.params.id} not found` });
    }

    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  } 
}

const updateProject = async (req, res) => {
  if (!req?.params?.id)  return res.status(400).json({ "message": "Project ID required!" });

  try {
    // Validate ID format using Mongoose's ObjectId.isValid()
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Project ID format" });
    }

    const project = await Project.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      githubUrl: req.body.githubUrl,
      techStack: req.body.techStack,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

const deleteProject = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Project ID required!" });

  try {
    // Validate ID format using Mongoose's ObjectId.isValid()
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Project ID format" });
    }

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ "message": `No project matches ID ${req.params.id}.` });
    }

    return res.status(200).json(project);

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

export { getAllProjects, createNewProject, getProject, updateProject, deleteProject }