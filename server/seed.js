require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {
    seed: (req, res) => {
        sequelize.query(
            `
            drop table if exists ratings;
            drop table if exists users;

            create table users (
                user_id SERIAL PRIMARY KEY,
                first_name VARCHAR(100), 
                last_name VARCHAR(100), 
                email VARCHAR(50) UNIQUE, 
                sign VARCHAR(50)            );

            create table ratings (
                rating_id SERIAL PRIMARY KEY,
                rating INT,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(user_id) 
            )
            `
        )
        .then(() => res.status(200).send("Tables created successfully"))
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
    }
}
