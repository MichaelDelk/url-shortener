/**
 * TODO - Fix logging.
 * TODO - Sanitize inputs.
 * TODO - Headers in all files
 * TODO - Headers on all functions.
 * TODO - helmet for security
 * TODO - Lint!
 * TODO - .env file - Document in readme.
 * TODO - Better messaging/error-handling.
 * TODO - Note: Not re-directing. Returning object for processing.
 * TODO - Use sync for sequential. No need to go async, then convert to sync.
 * TODO - Use console.info and console.error.
 * TODO - Implement requestCount.
 * TODO - Standardize url vs urlRequested.
 * TODO - Return entire object or just requested element?
 * TODO - Installation, dev/prod usage in readme.
 * TODO - Test difference in general error handling/reporting dev vs prod.
 */

const express = require('express');
// const helmet = require('helmet'); // Security
const logger = require('morgan'); // Logging
require("dotenv").config();

const app = express();

const publicRoutes = require('./routes/public.js');

app.use(express.json()); // Allow access to request body as req.body.
app.use(logger('dev'));  // Log incoming request in dev mode.

app.use('/', publicRoutes);

/**
 * Endpoint to generate an error within code to verify overall error handling.
 */
app.get('/error', () => {
    throw new Error('Generate error in code to test overall error handling.');
});
  
/**
 * Final fallback: Endpoint not found.
 */
app.use('/', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Requested API endpoint does not exist.',
    });
});
  
/**
 * Process unhandled errors.
 */
app.use((error, req, res) => {
    if (error) {
        // TODO - Notify IT Dept.
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server started listening on port: ', PORT);
});