import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({ path: "./.env" });
import connectToDatabase from "./database/database.js";

const port = process.env.PORT || 8000;
console.log(port)

app.get("/", (req, res) => {
  res.send("the server is running fine");
});

app.get("/home", (req, res) => {
  res.send("this is the home of the server");
});

app.listen(port, () => {
  console.log("the server is running fine");
});

const connectingDatabase = async () => {
  await connectToDatabase();
};

connectingDatabase();