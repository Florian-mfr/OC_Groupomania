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

exports.createComment = (req, res, next) => {

  let postId = req.body.postId
  let commentContent = req.body.content
  let userId = req.body.userId

  let data = [postId, commentContent, userId]

  db.query('INSERT INTO comments SET postId=?, commentContent=?, userId=? ', data, (err, result, field) => {
    if (err) throw (err);
    return res.status(201).json({ message: 'Commentaire enregistré !' });
  })
}

exports.getPostComments = (req, res, next) => {
  let postId = req.params.id
  db.query('SELECT * FROM comments WHERE postId=?',postId ,(err, result, field) => {
    if (err) throw (err);
    return res.status(200).json({ result });
  })
};

