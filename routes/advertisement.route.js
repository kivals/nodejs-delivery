const express = require('express');

const router = express.Router();
const { advertisementController } = require('../controllers');
const validate = require('../middlewares/validate');
const advertisementValidation = require('../validations/advertisement.validations');
const fileUploader = require('../middlewares/uploader');
const prepareUploads = require('../middlewares/prepareUploads');
const mustBeAuthenticated = require('../middlewares/mustBeAuthticated');

router
  .route('/')
  .get(advertisementController.getAdvertisements)
  .post(
    mustBeAuthenticated,
    fileUploader.array('images', 10),
    prepareUploads,
    validate(advertisementValidation.saveAdvertisement),
    advertisementController.createAdvertisements,
  );

module.exports = router;
