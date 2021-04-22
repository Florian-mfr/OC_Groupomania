const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const adminCtrl = require('../controllers/admin');


router.get('/post', auth, admin, adminCtrl.getReportedPosts);
router.get('/comment', auth, admin, adminCtrl.getReportedComments);
router.put('/post/:id', auth, admin, adminCtrl.cancelReportPost)
router.put('/comment/:id', auth, admin, adminCtrl.cancelReportComment)

module.exports = router;