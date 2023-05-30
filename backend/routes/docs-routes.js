const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth')
const docsControllers = require('../controllers/docs-controllers');

const router = express.Router();

router.get('/:docId', docsControllers.getDocById);
router.get('/user/:uid', docsControllers.getDocsByUserId);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  docsControllers.createDoc
);

router.patch(
  '/:docId',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  docsControllers.updateDoc
);

router.delete('/:docId', docsControllers.deleteDoc);

module.exports = router;
