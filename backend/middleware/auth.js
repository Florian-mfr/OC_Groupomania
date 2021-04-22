/*const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
    const userId = decodedToken.userId;

    console.log(req.body)
    console.log(req.body.userId, userId)
    console.log(req.body.userId !== userId)
    console.log(req.body.userId == userId)

    if (req.body.userId !== userId) {
      if (req.method == 'GET') {
        req.body.userId = userId
        next()
      }
      console.log('invalid user ID')
      throw 'Invalid user ID';
    } else if(req.body.userId == userId) {
      
      console.log('Authentification réussi')
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId != userId) {
      throw 'Invalid user ID';
    } else {
      if (req.method == 'GET') {
        req.body.userId = userId
      }
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};