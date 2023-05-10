const urlRepository = require('../database/urls');

const decodeUrl = (req, res) => {

    const token = req.body.token;

    const urlRequested = urlRepository.getUrlForToken(token);

    const responseJSON = {
        'success' : true,
        'message' : '',
        'urlRequested' : urlRequested
    }
    return res.status(200).json(responseJSON);
};

module.exports = { decodeUrl };
