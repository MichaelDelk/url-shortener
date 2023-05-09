const shortid = require('shortid');
const URL = require('url').URL;
const urlRepository = require('../database/urls');

const encodeUrl = (req, res) => {
    const urlRequested = req.body.url;
    const isValidUrl = stringIsValidUrl(urlRequested);
    const token = shortid.generate();
    const reqCount = 0;

    // TODO - Verify requested url is not already encoded.

    urlRepository.create({
        urlRequested,
        token,
        reqCount
    });

    console.log(urlRepository.getUrlForToken('zfZhRyj4E'));

    const responseJSON = {
        'success' : true,
        'message' : 'We want to encode this: ' + urlRequested,
        'shortenedUrl' : 'to this: ' + token,
        'isValidUrl' : isValidUrl
    }
    return res.status(200).json(responseJSON);
};

module.exports = { encodeUrl };

const stringIsValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};
