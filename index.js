import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import './config/config.js';
import usersRoute from "./routes/usersRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const databaseUrl = process.env.DATABASE_URL;
const port = process.env.PORT;

// Cross Origin Resource Sharing
app.use(cors());

// Built-in middleware for json 
app.use(express.json());

app.get("/", (req, res) => {
  res.send(port);
});

// Routes
app.use('/users', usersRoute);
app.use('/auth', authRoute)

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