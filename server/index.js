require('dotenv').config()
const express = require("express");
const app = express ();
const cors = require('cors');
const {SERVER_PORT} = process.env
const {CONNECTION_STRING} = process.env
const {getHoroscope, createUser, loginUser} = require("./controller")
const {seed} = require("./seed")
app.use(express.json());
app.use(cors())

app.post('/seed', seed)


//GET 
app.get("/api/horoscope", getHoroscope)

//USER Routes
app.post("/api/users", createUser)
app.post("/api/login", loginUser)


app.listen(4000, () => console.log("Server connected on port: "+ SERVER_PORT))
