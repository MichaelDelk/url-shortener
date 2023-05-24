const shortid = require('shortid');
const URL = require('url').URL;
const urlRepository = require('../database/urls');

const encodeUrl = (req, res) => {
    const urlRequested = req.body.url;
    const token = shortid.generate();
    const reqCount = 0;

    /**
     * Return "422 Unprocessable Entity" for bad input.
     */
    if (!urlRequested || !stringIsValidUrl(urlRequested)) {
        const responseJSON = {
            success: false,
            urlRequested: urlRequested,
            message: 'urlRequested must be a valid url.'
        }
        console.log(JSON.stringify(responseJSON));
        return res.status(422).json(responseJSON);
    }

    /**
     * Return token if requested url has been previously encoded.
     */
    const urlObject = urlRepository.getTokenForUrl(urlRequested)
    if (urlObject) {
        console.log(JSON.stringify(urlObject));
        // return res.status(200).json(JSON.stringify(urlObject));
        return res.status(200).send(urlObject);
    }

    urlRepository.create({
        urlRequested,
        token,
        reqCount
    });

    const responseJSON = {
        'success' : true,
        'url' : urlRequested,
        'token' : token
    }
    return res.status(200).send(responseJSON);
};

const stringIsValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = { encodeUrl };
