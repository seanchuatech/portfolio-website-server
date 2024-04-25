import express from 'express';
const router = express.Router();
import { getAllUsers, createNewUser, getUser, updateUser, deleteUser } from '../controllers/usersController.js';


// ROUTE FOR GETTING LIST OF USERS
router.get("/", getAllUsers);

// ROUTE FOR CREATING USER
router.post("/", createNewUser);

// ROUTE FOR GETTING USER USING ID
router.get("/:id", getUser);

// ROUTE FOR UPDATING A USER
router.put("/:id", updateUser);

// ROUTE FOR DELETING A USER
router.delete("/:id", deleteUser);

export default router;
