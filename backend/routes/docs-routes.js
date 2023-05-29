const express = require('express');
const { check } = require('express-validator');

const docsControllers = require('../controllers/docs-controllers');

const router = express.Router();

router.get('/:did', docsControllers.getDocById);
router.get('/user/:uid', docsControllers.getDocsByUserId);

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
