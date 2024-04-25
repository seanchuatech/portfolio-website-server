import bcrypt from "bcrypt";
import { User } from '../models/User.js';

const handleLogin = async (req, res) => {
 const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ "message": "Username and password are required."});
  
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  
  if (match) {
    // Create JWT
    res.json({ 'success': `User ${username} is successfully logged in!` });
  } else {
    res.sendStatus(401);
  }
}

export { handleLogin }