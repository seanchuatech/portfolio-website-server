import express from 'express';
const router = express.Router();
import { getAllProjects, createNewProject, getProject, updateProject, deleteProject } from '../controllers/projectsController.js';


// ROUTE FOR GETTING LIST OF USERS
router.get("/", getAllProjects);

// ROUTE FOR CREATING USER
router.post("/", createNewProject);

// ROUTE FOR GETTING USER USING ID
router.get("/:id", getProject);

// ROUTE FOR UPDATING A USER
router.put("/:id", updateProject);

// ROUTE FOR DELETING A USER
router.delete("/:id", deleteProject);

export default router;
