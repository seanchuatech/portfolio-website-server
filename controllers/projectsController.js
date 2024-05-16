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
      lastname: req.body.lastname,
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

export { getAllProjects, createNewProject }