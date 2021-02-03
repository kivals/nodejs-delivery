const express = require('express');

const router = express.Router();
const advertisementController = require('../controllers/advertisement.controller');

router
  .route('/')
  .get(advertisementController.advertisements)
  .post(advertisementController.uploadAdvertisement);

router
  .route('/advertisements/:id')
  .get(advertisementController.advertisementById)
  .delete(advertisementController.deleteAdvertisement);

module.exports = router;
