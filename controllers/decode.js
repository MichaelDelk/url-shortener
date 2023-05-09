const decodeUrl = (req, res) => {
    const responseJSON = {
        'success' : true,
        'message' : 'We want to decode this: ' + req.body.url
    }
    return res.status(200).json(responseJSON);
};

module.exports = { decodeUrl };
