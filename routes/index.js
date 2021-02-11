const express = require('express');
const advertisementRoute = require('./advertisement.route');
const authRoute = require('./auth.route');

const router = express.Router();

router.use('/advertisements', advertisementRoute);
router.use('/auth', authRoute);

module.exports = router;
