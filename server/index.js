require('dotenv').config()
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express ();
const cors = require('cors');
const {SERVER_PORT} = process.env
const {CONNECTION_STRING} = process.env
const {SECRET_KEY} = process.env;
const {getHoroscope, createUser, loginUser, createRating} = require("./controller")
const {seed} = require("./seed")

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('node_modules'));



const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
    credentials: true
};
// app.use(cors(corsOptions));

app.use(session({
    secret: SECRET_KEY,
    // resave: false,
    // saveUninitialized: true
}));

app.post('/seed', seed)

// app.options('*', cors(corsOptions));



//GET 
app.get("/api/horoscope", getHoroscope)

//USER Routes
app.post("/api/users", createUser)
app.post("/api/login", loginUser)

//RATING
app.post("/api/rating", createRating)


app.listen(4000, () => console.log("Server connected on port: "+ SERVER_PORT))
