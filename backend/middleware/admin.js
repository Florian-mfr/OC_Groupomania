const db = require('../dbConnect.js');

module.exports = (req, res, next) => {
    db.query(`SELECT isAdmin FROM users WHERE id="${req.body.userId}"`, (err, result) => {
        if(err) throw err;
        console.log(result)
        if(result[0].isAdmin == 1) {
            next();
        }
        else {console.log('Accès non autorisé ')
            return res.status(403).json({ message: 'Accès non autorisé '});
            
        }
    })
};