import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from '../models/User.js';
import '../config/config.js';

const handleLogin = async (req, res) => {
 const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ "message": "Username and password are required."});
  
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  
  if (match) {
    // Create JWT
    const accessToken = jwt.sign(
      {
        "username": foundUser.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      {
        "username": foundUser.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // Creates Secure Cookie with refresh token (1 day)
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });  // for prod
    // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // for testing

    // Send authorization roles and access token to user
    res.json({ accessToken }); // Frontend should store this in memory since not safe in localStorage or cookies
  } else {
    res.sendStatus(401);
  }
}

export { handleLogin }