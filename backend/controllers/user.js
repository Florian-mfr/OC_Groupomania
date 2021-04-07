const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const db = require('../dbConnect.js')
require('dotenv').config()



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
        if(user) {
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

    db.query(`SELECT * FROM users WHERE email=${email} AND password=${hash}`,(err, result, field) => {
        if (err) throw err;
            console.log('Connection réussi !')
        })
};