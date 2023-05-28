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
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  docsControllers.createDoc
);

router.patch(
  '/:did',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  docsControllers.updateDoc
);

router.delete('/:did', docsControllers.deleteDoc);

module.exports = router;
