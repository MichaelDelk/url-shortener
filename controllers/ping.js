const ping = (req, res) => {
    const responseJSON = {
        'success' : true,
        'message': 'Healthy'
    }
    return res.status(200).json(responseJSON);
};

module.exports = { ping };
