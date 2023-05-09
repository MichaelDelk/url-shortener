/**
 * routes/public.js - Public routes
 */
const express = require('express');
const router = express.Router();

const decodeController = require('../controllers/decode');
const encodeController = require('../controllers/encode');
const pingController = require('../controllers/ping');

router.get('/decode', decodeController.decodeUrl);
router.post('/encode', encodeController.encodeUrl);
router.get('/ping', pingController.ping);

module.exports = router;