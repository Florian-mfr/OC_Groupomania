const db = require('../dbConnect.js')
const fs = require('fs');

exports.createPost = (req, res, next) => {
  let tittle = req.body.tittle
  let content = req.body.content
  let userId = req.body.userId

  let data = [tittle, content, userId]

  db.query('INSERT INTO posts SET tittle=?, content=?, userId=? ', data, (err, result, field) => {
    if (err) throw (err);
    return res.status(201).json({ message: 'Post enregistré !' });
  })
};

exports.getAllPosts = (req, res, next) => {
  db.query('SELECT * FROM posts', (err, result, field) => {
    if (err) throw (err);
    return res.status(200).json({ result });
  })
};

exports.reportPost = (req, res, next) => {
    db.query(`UPDATE posts SET reported="1" WHERE id=${req.params.id}`, (err, result, field) => {
      if (err) throw (err);
      return res.status(201).json({ message: 'Post signaler avec succès' });
    })
};

exports.deletePost = (req, res, next) => {
  db.query(`DELETE FROM posts WHERE id=${req.params.id}`, (err, result, field) => {
    if (err) throw (err);
    return res.status(200).json({ message: 'Post supprimer !' });
  })
}



