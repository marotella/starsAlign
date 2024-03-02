require('dotenv').config()
const axios = require("axios");

const { CONNECTION_STRING, API_KEY } = process.env
const Sequelize = require('sequelize')


const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: false,
    }
  });
module.exports = {
    getHoroscope: async (req, res) => {
        try {
            const options = {
                method: 'GET',
                url: 'https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/',
                params: { zodiacSign: currentUser.sign },
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'best-daily-astrology-and-horoscope-api.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            console.log(response)
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createUser: async (req, res) => {
        const {
            first_name,
            last_name,
            email,
            sign
        } = req.body
        const query = ` INSERT INTO users (first_name, last_name, email, sign) VALUES ('${first_name}', '${last_name}','${email}', '${sign}')`
        sequelize.query(query)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(error => console.log(error))
    },
    loginUser: async (req, res) => {
        console.log(req.body)
        const {email} = req.body
        console.log = email
        const query = `SELECT * FROM USERS WHERE email = '${email}'`
        sequelize.query(query)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(error => console.log(error))

    }

}

