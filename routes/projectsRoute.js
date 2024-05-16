import express from 'express';
const router = express.Router();
import { getAllProjects, createNewProject } from '../controllers/projectsController.js';


// ROUTE FOR GETTING LIST OF USERS
router.get("/", getAllProjects);

// ROUTE FOR CREATING USER
router.post("/", createNewProject);

// // ROUTE FOR GETTING USER USING ID
// router.get("/:id", getUser);

// // ROUTE FOR UPDATING A USER
// router.put("/:id", updateUser);

// // ROUTE FOR DELETING A USER
// router.delete("/:id", deleteUser);

export default router;
