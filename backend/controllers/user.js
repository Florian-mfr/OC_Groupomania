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

    let hash = crypto.createHmac('sha256', password)
        .update('15h64luy4qze5gj46')
        .digest('hex');

    let data = [firstname, lastname, email, hash]

    db.query('INSERT INTO users SET firstname=?, lastname=?, email=?, password=?', data, (err, user, field) => {
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
        if (hash !== result[0].password) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        else {
            res.status(200).json({
                userId: result[0].id,
                email,
                token: jwt.sign(
                    { userId: result[0].id },
                    process.env.JWT_PASSWORD,
                    { expiresIn: '24h' }
                )
            });
        }
    })

};

exports.getUser = (req, res, next) => {
    let id = req.params.id
    db.query('SELECT * FROM users WHERE id=?', id, (err, result, field) => {
        if (err) throw (err);
        return res.status(200).json({ result });
    })
}

exports.changePassword = (req, res, next) => {
    let password = req.body.password

    const hash = crypto.createHmac('sha256', password)
        .update('15h64luy4qze5gj46')
        .digest('hex');

    db.query(`UPDATE users SET password="${hash}" WHERE id="${req.body.userId}"`, (err, result, field) => {
        if(err) throw err;
        return res.status(200).json({ message: 'Le mot de passe a bien été changé '});
    })
}