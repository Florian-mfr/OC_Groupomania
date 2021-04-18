const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
/*const multer = require('../middleware/multer-config');*/

const postCtrl = require('../controllers/post');

//post 
router.post('/',/* auth, /*multer,*/ postCtrl.createPost);
router.get('/',/* auth,*/ postCtrl.getAllPosts);
router.put('/report/:id', postCtrl.reportPost);
router.delete('/:id', postCtrl.deletePost)

/*router.put('/:id', auth, multer, postCtrl.modifyPost);*/
/*router.delete('/:id', auth, postCtrl.deletePost);*/


module.exports = router;