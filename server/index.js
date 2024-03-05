require('dotenv').config()
const express = require("express");
const session = require("express-session")
const app = express ();
const cors = require('cors');
const {SERVER_PORT} = process.env
const {CONNECTION_STRING} = process.env
const {SECRET_KEY} = process.env;
const {getHoroscope, createUser, loginUser} = require("./controller")
const {seed} = require("./seed")

app.use(express.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
    credentials: true
};
app.use(cors(corsOptions));

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

app.post('/seed', seed)

app.options('*', cors(corsOptions));



//GET 
app.get("/api/horoscope", getHoroscope)

//USER Routes
app.post("/api/users", createUser)
app.post("/api/login", loginUser)


app.listen(4000, () => console.log("Server connected on port: "+ SERVER_PORT))
