const db = require('../dbConnect.js')
const fs = require('fs');

exports.createPost = (req, res, next) => {

    let postDate = req.body.postDate
    let tittle = req.body.tittle
    let content = req.body.content
    let userId = req.body.userId

    let data = [postDate, tittle, content, userId]

    db.query('INSERT INTO posts SET postDate=?, tittle=?, content=?, userId=? ', data, (err, result, field) => {
        if(err) throw (err);
        return res.status(201).json({ message: 'Post enregistré !' });
    })
};

exports.getAllPosts = (req, res, next) => {
    db.query('SELECT * FROM posts', (err, result, field) => {
        if(err) throw (err);
        return res.status(200).json({ result });
    })
};

/*exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};*/

