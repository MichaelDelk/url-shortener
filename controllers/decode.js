const urlRepository = require('../database/urls');

const decodeToken = (req, res) => {

    const token = req.body.token;

    const url = urlRepository.getUrlForToken(token);

    const responseJSON = {
        'success' : true,
        'message' : '',
        'urlObject' : url
    }
    return res.status(200).json(responseJSON);
};

module.exports = { decodeToken };
