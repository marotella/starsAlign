require('dotenv').config()
const express = require("express");
const app = express ();
const cors = require('cors');
const {SERVER_PORT} = process.env
const {CONNECTION_STRING} = process.env
const {getHoroscope} = require("./controller")
const {seed} = require("./seed")
app.use(express.json());
app.use(cors())

app.post('/seed', seed)


//GET 
app.get("/horoscope", getHoroscope)

app.listen(4000, () => console.log("Server connected on port"+ SERVER_PORT))
