import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import './config/config.js';
import usersRoute from "./routes/usersRoute.js";
import authRoute from "./routes/authRoute.js";
import refreshRoute from "./routes/refreshRoute.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";

const app = express();
const databaseUrl = process.env.DATABASE_URL;
const port = process.env.PORT;

// Cross Origin Resource Sharing
app.use(cors());

// Built-in middleware for json 
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(port);
});

// Routes
app.use('/auth', authRoute);
app.use('/refresh', refreshRoute);

// Protected routes
app.use(verifyJWT);
app.use('/users', usersRoute);

// Database and Initialization
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log('Successfully connected to database.');
    app.listen(port, () => {
      console.log(`App is listening to port ${port}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });