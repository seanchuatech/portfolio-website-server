import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import '../config/config.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) return res.status(204).json({ 'message': 'No users found' });
    
    res.json(users);
    console.log('what?', users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
    // res.status(500).json({ message: 'Internal server error' }); // Generic error message for the client (production)
  }
}

const createNewUser = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname || !req?.body?.username) {
    return res.status(400).json({ 'message': 'There\'s a missing field!' });
  }

  // Check for duplicate user in DB
  const duplicate = await User.findOne({ username: req.body.username}).exec();
  if (duplicate) return res.sendStatus(409) // Conflict

  try {
    const defaultPassword = process.env.DATABASE_URL;
    const hashedPwd = await bcrypt.hash(defaultPassword, 10);
    
    const result = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashedPwd
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
}

const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "User ID required!" });
  const user = await User.findOne({ _id: req.params.id }).exec();

  res.status(200).json(user);
}

const updateUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "User ID required!" });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "User ID required!" });

  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(204).json({ "message": `No user matches ID ${req.params.id}.` });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}


export { getAllUsers, createNewUser, getUser, updateUser, deleteUser }