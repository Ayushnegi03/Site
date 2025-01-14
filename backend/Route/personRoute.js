const express = require('express');
const {
  createPerson,
  getAllPersons,
  getPersonById,
  updatePerson,
  deletePerson,
} = require('../controllers/personController');
const validatePerson = require('../middleware/personMiddleware');

const router = express.Router();

// Routes
router.post('/', createPerson);
router.get('/', getAllPersons);
router.get('/:id', getPersonById);
router.put('/:id', updatePerson);
router.delete('/person:id', deletePerson);

module.exports = router;
