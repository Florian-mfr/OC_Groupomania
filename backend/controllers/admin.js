const db = require('../dbConnect.js')
const fs = require('fs');

exports.getReportedPosts = (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE reported="1" ORDER BY id DESC`, (err, result, field) => {
    if (err) throw (err);
    return res.status(200).json({ result });
  })
};

exports.getReportedComments = (req, res, next) => {
  db.query(`SELECT * FROM comments WHERE reported="1" ORDER BY id DESC`, (err, result, field) => {
    if (err) throw (err);
    return res.status(200).json({ result });
  })
};

exports.cancelReportPost = (req, res, next) => {
    db.query(`UPDATE posts SET reported="0" WHERE id=${req.params.id}`, (err, result, field) => {
      if (err) throw (err);
      console.log('report canceled')
      return res.status(201).json({ message: 'Signalement annuler' });
    })
}

exports.cancelReportComment = (req, res, next) => {
    db.query(`UPDATE comments SET reported="0" WHERE id=${req.params.id}`, (err, result, field) => {
      if (err) throw (err);
      return res.status(201).json({ message: 'Signalement annuler' });
    })
}