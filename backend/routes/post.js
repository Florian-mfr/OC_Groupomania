const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
/*const multer = require('../middleware/multer-config');*/

const postCtrl = require('../controllers/post');

//post 
router.post('/',/* auth, /*multer,*/ postCtrl.createPost);
router.get('/',/* auth,*/ postCtrl.getAllPosts);

//comment
router.post('/comments',/* auth, /*multer,*/ postCtrl.createComment);
router.get('/comments/:id',/* auth,*/ postCtrl.getPostComments);



/*router.put('/:id', auth, multer, postCtrl.modifyPost);*/
/*router.delete('/:id', auth, postCtrl.deletePost);*/


module.exports = router;