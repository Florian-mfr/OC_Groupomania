const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/',/* auth, /*multer,*/ commentCtrl.createComment);
router.put('/report/:id', commentCtrl.reportComment);
router.get('/:id', /*auth,*/ commentCtrl.getPostComments);
router.delete('/:id', commentCtrl.deleteComment)

module.exports = router;