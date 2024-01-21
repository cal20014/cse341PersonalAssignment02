require("dotenv").config();

const express = require("express");
const app = express();
const connectToDatabase = require("./db/connect.js");
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Used to parse URL-encoded bodies

// Connect to MongoDB when the server starts
connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

app.use("/", require("./routes"));

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});