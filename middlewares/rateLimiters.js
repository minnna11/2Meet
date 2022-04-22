const rateLimit = require('express-rate-limit');

exports.logInLimiter = rateLimit({
    windowMs: 60 * 1000, ///one min
    max: 5,
    // message: 'Too many login request, Try again later'
    handler: (req, res, next)=>{
        let err = new Error('Too many login request. Try again later');
        err.status = 420;
        return next(err);
    }
});