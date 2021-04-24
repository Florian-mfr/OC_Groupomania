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


    let generalRegex = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-']{2,}$/
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let verification = [
        emailRegex.test(email),
        generalRegex.test(firstname),
        generalRegex.test(lastname),
        generalRegex.test(password),
    ]

    if (verification.every(Boolean)) {
        db.query(`SELECT * FROM users WHERE email="${email}"`, (err, result, field) => {
            if (err) throw err;
            if (result.lenght > 0) {
                return res.status(500).json({ message: 'Adresse email déjà utilisée' });
            } else {
                let hash = crypto.createHmac('sha256', password)
                    .update('15h64luy4qze5gj46')
                    .digest('hex');

                let data = [firstname, lastname, email, hash]

                db.query('INSERT INTO users SET firstname=?, lastname=?, email=?, password=?', data, (err, user, field) => {
                    if (err) throw err;
                    if (user) {
                        return res.status(201).json({ message: 'Votre compte a bien été créer' });
                    }
                })
            }
        })
    } else {
        return res.status(500).json({ message: 'Saisie invalide' });
    }
}

exports.login = (req, res, next) => {

    let email = req.body.email
    let password = req.body.password

    let generalRegex = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-'?!:;.,+]{2,255}$/
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let verification = [
        emailRegex.test(email),
        generalRegex.test(password),
    ]

    if (verification.every(Boolean)) {
        const hash = crypto.createHmac('sha256', password)
            .update('15h64luy4qze5gj46')
            .digest('hex');

        db.query('SELECT * FROM users WHERE email=?', email, (err, result, field) => {
            if (err) throw err;
            if (hash !== result[0].password) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            else {
                return res.status(200).json({
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
    } else {
        return res.status(500).json({ message: 'Saisie invalide' });
    }


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

    let generalRegex = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-'?!:;.,+]{2,255}$/

    let verification = [
        generalRegex.test(password),
    ]
    if (verification.every(Boolean)) {
        const hash = crypto.createHmac('sha256', password)
            .update('15h64luy4qze5gj46')
            .digest('hex');

        db.query(`UPDATE users SET password="${hash}" WHERE id="${req.body.userId}"`, (err, result, field) => {
            if (err) throw err;
            return res.status(200).json({ message: 'Le mot de passe a bien été changé ' });
        })
    } else {
        return res.status(500).json({ message: 'Saisie invalide' });
    }
}

exports.deleteUser = (req, res, next) => {
    db.query(`DELETE FROM users WHERE id=${req.params.id}`, (err, result, field) => {
        if (err) throw (err);
        return res.status(200).json({ message: 'Utilisateur supprimer !' });
    })
}