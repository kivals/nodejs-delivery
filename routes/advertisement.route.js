const express = require('express');

const router = express.Router();
const { advertisementController } = require('../controllers');

router
  .route('/')
  .get(advertisementController.getAdvertisements)
  .post(advertisementController.createAdvertisements);

module.exports = router;
