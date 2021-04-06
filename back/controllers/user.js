const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

function dbconnect() {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "groupomania"
    });

    con.connect();

    return con;
}

exports.signup = (req, res, next) => {
    let db = dbconnect()

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
    })
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
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
        })
        .catch(error => res.status(500).json({ error }));
};