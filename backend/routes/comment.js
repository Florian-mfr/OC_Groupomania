const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/', auth,  commentCtrl.createComment);
router.put('/report/:id', auth, commentCtrl.reportComment);
router.get('/:id', auth, commentCtrl.getPostComments);
router.delete('/:id', auth, commentCtrl.deleteComment)

module.exports = router;