import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import '../config/config.js';

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log('this line', cookies, cookies.jwt)
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden
  // Evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { "username": decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '300s' }
      );
      res.json({ accessToken });
    }
  );
}

export { handleRefreshToken }