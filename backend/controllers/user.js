const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
require('dotenv').config()

const db = require('../dbConnect')

exports.signup = (req, res, next) => {

    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let password = req.body.password


    const hash = crypto.createHmac('sha256', password)
        .update('15h64luy4qze5gj46')
        .digest('hex');

    let data = [firstname, lastname, email, hash]

    db.query('INSERT INTO users SET firstname=?, lastname=?, email=?, password=? ', data, (err, user, field) => {
        if (err) throw err;
        if (user) {
            console.log('Inscription réussi ! ')
        }
    })
}

exports.login = (req, res, next) => {

    let email = req.body.email
    let password = req.body.password

    const hash = crypto.createHmac('sha256', password)
        .update('15h64luy4qze5gj46')
        .digest('hex');

    db.query('SELECT * FROM users WHERE email=?', email, (err, result, field) => {
        if (err) throw err;
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                const email = maskEmail(req.body.email);
                res.status(200).json({
                    userId: user._id,
                    email,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.JWT_PASSWORD,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        console.log('Connection réussi !')
    })
};