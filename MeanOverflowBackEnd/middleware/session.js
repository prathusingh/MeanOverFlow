/**
 * Created by root on 7/12/15.
 */
var isAuthenticated = function (req, res, next) {


    if (req.isAuthenticated())
        return next();

    res.send('Login Needed');

};

module.exports=isAuthenticated;
