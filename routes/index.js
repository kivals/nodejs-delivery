const express = require('express');
const advertisementRoute = require('./advertisement.route');

const router = express.Router();

router.use('/advertisement', advertisementRoute);

module.exports = router;
