require('dotenv').config()
const axios = require("axios");

const {CONNECTION_STRING, API_KEY} = process.env
const Sequelize = require('sequelize')


const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {
    getHoroscope: async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/',
            params: { zodiacSign: 'taurus' },
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
    
};
