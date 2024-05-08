const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const verifyStates = require('../../middleware/verifyStates');

router.route('/')
    .get(statesController.getAllStates)
    .post(verifyStates, statesController.createNewState)
    .put(verifyStates, statesController.updateState)
    .delete(verifyStates, statesController.deleteState);

router.route('/:id')
    .get(statesController.getState);

module.exports = router;