const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Could not access to system');
    
    //check token
    try {
        //verify
        const checkToken = jwt.verify(token, 'chuoibimatkdctietlo');
        req.user = checkToken;
        next();

    } catch (e) {
        res.status(400).send('Token incorrect - Permission denied')
    }
}