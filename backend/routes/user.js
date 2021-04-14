const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.getUser);

router.put('/changePassword', userCtrl.changePassword)

module.exports = router;