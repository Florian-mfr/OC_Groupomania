const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const adminCtrl = require('../controllers/admin');


router.get('/post', /*auth,*/ adminCtrl.getReportedPosts);
router.get('/comment', /*auth,*/ adminCtrl.getReportedComments);
router.put('/post/:id', adminCtrl.cancelReportPost)
router.put('/comment/:id', adminCtrl.cancelReportComment)


/*router.put('/report/:id', commentCtrl.reportComment);
router.post('/',/* auth, /*multer, commentCtrl.createComment);*/

module.exports = router;