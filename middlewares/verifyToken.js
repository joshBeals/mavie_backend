const jwt = require('jsonwebtoken');

module.exports = function auth (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.send(400).send(err)
    }
}