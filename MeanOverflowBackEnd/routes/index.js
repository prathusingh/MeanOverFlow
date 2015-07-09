/**
 * Created by root on 7/6/15.
 */

var fail=require('../dataservice/userfail');
var form=require('../dataservice/discussionform');



module.exports=function(app,passport)
{


   // app.post('/login',authenticate.login);
    //app.post('/signup', authenticate.signup)

   // app.options('/api/signup', cors());
    app.post('/api/signup',passport.authenticate('local-signup',{
        successRedirect:'/api/discussionform',
        failureRedirect:'/signupfail',
        failureFlash:true

    }));

   // app.options('/api/login', cors());
    app.post('/api/login',passport.authenticate('local-login',{
        successRedirect:'/api/discussionform',
        failureRedirect:'/loginfail',
        failureFlash:true

    }));



    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/loginfail',
            failureRedirect : '/loginfail'
        }));


    app.get('/api/discussionform',form.data);

    app.get('/signupfail', fail.signupfail);


    app.get('/loginfail', fail.loginfail);

    // app.options('/api/discussionform', cors());


    app.get('/api/logout', function(req, res) {
        req.logout();
        res.send({result:'Logout Success'});
    });



   // app.get('/logout',authenticate.logout);

   /*
    function isLoggedIn(req,res,next)
    {
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page

    }

    */


};



