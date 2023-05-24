const urlRepository = require('../database/urls');

const decodeToken = (req, res) => {
    const token = req.body.token;
    const url = urlRepository.getUrlForToken(token);
    const reqCount = 0;

    const responseJSON = {
        'success' : true,
        'url' : url,
        'token' : token
    }
    return res.status(200).send(responseJSON);
};

module.exports = { decodeToken };
