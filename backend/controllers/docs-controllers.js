const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');

let DUMMY_DOCS = [
  {
    id: 'd1',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

const getDocById = (req, res, next) => {
  const docId = req.params.did;

  const doc = DUMMY_DOCS.find(p => p.id === docId);

  if (!doc) {
    throw new HttpError('Could not find a doc for the provided id.', 404);
  }

  res.json({ doc });
};

const getDocsByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const docs = DUMMY_DOCS.filter(p => p.creator === userId);

  if (!docs || docs.length === 0) {
    return next(
      new HttpError('Could not find docs for the provided user id.', 404)
    );
  }

  res.json({ docs });
};

const createDoc = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdDoc = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_DOCS.push(createdDoc);

  res.status(201).json({ doc: createdDoc });
};

const updateDoc = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description } = req.body;
  const docId = req.params.did;

  const updatedDoc = { ...DUMMY_DOCS.find(p => p.id === docId) };
  const docIndex = DUMMY_DOCS.findIndex(p => p.id === docId);
  updatedDoc.title = title;
  updatedDoc.description = description;

  DUMMY_DOCS[docIndex] = updatedDoc;

  res.status(200).json({ doc: updatedDoc });
};

const deleteDoc = (req, res, next) => {
  const docId = req.params.did;
  if (!DUMMY_DOCS.find(p => p.id === docId)) {
    throw new HttpError('Could not find a doc for that id.', 404);
  }
  DUMMY_DOCS = DUMMY_DOCS.filter(p => p.id !== docId);
  res.status(200).json({ message: 'Deleted doc.' });
};

module.exports = {
  getDocById,
  getDocsByUserId,
  createDoc,
  updateDoc,
  deleteDoc
};
