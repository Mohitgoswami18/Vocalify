import express from "express"
const app = express() 

const port = 8000 

app.get( "/", (req, res) => {
    res.send("the server is running fine")
}) 

app.get("/home", (req, res) => {
  res.send("this is the home of the server");
}); 

app.listen(port, () => {
    console.log("the server is running fine")
})