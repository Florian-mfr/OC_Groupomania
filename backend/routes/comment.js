const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/',/* auth, /*multer,*/ commentCtrl.createComment);
router.get('/:id', /*auth,*/ commentCtrl.getPostComments);

module.exports = router;