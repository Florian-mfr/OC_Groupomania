const db = require('../dbConnect.js')
const fs = require('fs');

exports.createComment = (req, res, next) => {

  let postId = req.body.postId
  let commentContent = req.body.content
  let userId = req.body.userId

  let generalRegex = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-'?!:;.,+]{2,255}$/

  let verification = [
    generalRegex.test(commentContent),
  ]

  if (verification.every(Boolean)) {

    let data = [postId, commentContent, userId]

    db.query('INSERT INTO comments SET postId=?, commentContent=?, userId=? ', data, (err, result, field) => {
      if (err) throw (err);
      return res.status(201).json({ message: 'Commentaire enregistré !' });
    })
  } else {
    return res.status(500).json({ message: 'Saisie invalide' });
  }

};

exports.getPostComments = (req, res, next) => {
  let postId = req.params.id
  db.query('SELECT * FROM comments WHERE postId=?', postId, (err, result, field) => {
    if (err) throw (err);
    return res.status(200).json({ result });
  })
};

exports.reportComment = (req, res, next) => {
  db.query(`UPDATE comments SET reported="1" WHERE id=${req.params.id}`, (err, result, field) => {
    if (err) throw (err);
    return res.status(201).json({ message: 'Commentaire signaler avec succès' });
  })
};

exports.deleteComment = (req, res, next) => {
  db.query(`DELETE FROM comments WHERE id=${req.params.id}`, (err, result, field) => {
    if (err) throw (err);
    return res.status(200).json({ message: 'Commentaire supprimer !' });
  })
}
