const db = require('../dbConnect.js')
const fs = require('fs');

exports.getReportedPosts = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE reported="1"`, (err, result, field) => {
      if (err) throw (err);
      return res.status(200).json({ result });
    })
  };
  
exports.getReportedComments = (req, res, next) => {
    db.query(`SELECT * FROM comments WHERE reported="1"`, (err, result, field) => {
      if (err) throw (err);
      return res.status(200).json({ result });
    })
  };