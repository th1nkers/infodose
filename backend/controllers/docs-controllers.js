const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Doc = require('../models/doc');
const User = require('../models/user');
const mongoose = require('mongoose');

// Get a document by ID
const getDocById = async (req, res, next) => {
  const docId = req.params.did;

  let doc;
  try {
    doc = await Doc.findById(docId);
  } catch (err) {
    return next(new HttpError('Document not found', 500));
  }

  if (!doc) {
    return next(new HttpError('Document not found for the specific ID.', 404));
  }

  res.json({ doc: doc.toObject({ getters: true }) });
};

// Get documents by user ID
const getDocsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithDocs;
  try {
    userWithDocs = await User.findById(userId).populate('docs');
  } catch (err) {
    return next(new HttpError('Fetching docs failed, please try again.', 500));
  }

  if (!userWithDocs || userWithDocs.docs.length === 0) {
    return next(
      new HttpError('Could not find docs for the provided user ID.', 404)
    );
  }

  res.json({
    docs: userWithDocs.docs.map((doc) => doc.toObject({ getters: true })),
  });
};

// Create a new document
const createDoc = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, creator } = req.body;

  const createdDoc = new Doc({
    title,
    description,
    image:
      'https://exp.itemku.com/wp-content/uploads/2022/09/fakta-thomas-shelby-tommy-758x426.jpg?crop=1',
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError('Creating doc failed, please try again.', 500));
  }

  if (!user) {
    return next(new HttpError('Could not find user for provided ID', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdDoc.save({ session: sess });
    user.docs.push(createdDoc); // Add the newly created doc to the user's docs ID list
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Creating doc failed, please try again.', 500));
  }

  res.status(201).json({ doc: createdDoc.toObject({ getters: true }) });
};

// Update a document
const updateDoc = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description } = req.body;
  const docId = req.params.docId;

  let doc;
  try {
    doc = await Doc.findById(docId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find doc to update.', 404)
    );
  }

  doc.title = title;
  doc.description = description;

  try {
    await doc.save();
  } catch (err) {
    return next(new HttpError('Updating doc failed, please try again.', 500));
  }

  res.status(200).json({ doc: doc.toObject({ getters: true }) });
};

// Delete a document
const deleteDoc = async (req, res, next) => {
  const docId = req.params.docId;

  let doc;
  try {
    doc = await Doc.findById(docId).populate('creator');
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find doc to delete.', 500)
    );
  }

  if (!doc) {
    return next(new HttpError('Could not find doc to delete.', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await doc.deleteOne({ session: sess });
    doc.creator.docs.pull(doc);
    await doc.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Deleting doc failed, please try again.', 500));
  }

  res.status(200).json({ message: 'Deleted doc.' });
};

module.exports = {
  getDocById,
  getDocsByUserId,
  createDoc,
  updateDoc,
  deleteDoc,
};
