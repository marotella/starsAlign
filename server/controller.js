require('dotenv').config();
const axios = require("axios");
const { CONNECTION_STRING, API_KEY, SECRET_KEY } = process.env;
const Sequelize = require('sequelize');
let currentUser = null

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: false,
    }
});

module.exports = {
    createUser: async (req, res) => {
        const { first_name, last_name, email, sign } = req.body;
        const query = `INSERT INTO users (first_name, last_name, email, sign) VALUES ('${first_name}', '${last_name}','${email}', '${sign}')`;
        sequelize.query(query)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },
    loginUser: async (req, res) => {
        const { email } = req.body;
        console.log(email);
        const query = `SELECT * FROM USERS WHERE email = '${email}'`;
        sequelize.query(query)
            .then(dbRes => {
                if (dbRes[0].length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                currentUser = dbRes[0][0];
                req.session.currentUser = currentUser
                console.log(currentUser);
                console.log('Session data after login:', req.session);

                res.status(200).json(currentUser); 
            })
            .catch(error => console.log(error));
    },
    getHoroscope: async (req, res, currentUser) => {
        try {
            const currentUser = req.session.currentUser;
            console.log(currentUser)
            if (!currentUser) {
                return res.status(401).json({ error: 'User not logged in' });
            }
            const userSign = currentUser.sign;
            console.log(`This is the ${userSign}`);
            const options = {
                method: 'GET',
                url: 'https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/',
                params: { zodiacSign: `${userSign}` },
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'best-daily-astrology-and-horoscope-api.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            console.log(response.data);
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createRating: async (req, res) => {
        const {rating} = req.body;
        const {currentUser} = req.session;
        if (!currentUser){
            return res.status(401).json({error: "User not logged in"});

        } try {
            const query = `INSERT INTO ratings (rating, user_id)
            VALUES (${rating}, ${currentUser.user_id})`;
            await sequelize.query(query);
            res.status(200).send("Rating successful")
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "Internal error"})
        }
    },
    getAverageRating: async (req, res) => {
        const {currentUser} = req.session;
        if(!currentUser){
            return res.status(401).json({error:"User is not logged in"});
        } try {
            const query = `SELECT AVG(rating) AS average_rating FROM ratings WHERE ratings.rating.customer_id = ${currentUser.id} `
            await sequelize.query(query);
            res.status(200).send("Rating successful")
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "Internal error"})
        }
        
    }
};

