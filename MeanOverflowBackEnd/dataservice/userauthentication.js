/**
 * Created by root on 7/6/15.
 */

var LocalStrategy=require('passport-local').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('../config/auth');
var User=require('./usermodel');


module.exports=function(passport)
{
    passport.serializeUser(function(user,done)
    {
        done(null,user.id);
    });


    passport.deserializeUser(function(id,done)
    {
        User.findById(id,function(err,user)
        {
            done(err,user);
        })
    });


    passport.use('local-signup', new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        nameField:'name',
        passReqToCallback:true
    }, function(req,email,password,done)
    {

        console.log(email);
        console.log(req.body.name);
        process.nextTick(function()
        {
            User.findOne({'local.email':email}, function(err,user)
            {
                if(err)
                     return done(err);

                if(user){
                    return done(null,false,req.flash('signupMessage',' That email is already taken'))
                }

                else
                {
                    var newUser=new User();
                    newUser.local.email=email,
                    newUser.local.password=newUser.generateHash(password);
                    newUser.local.name=req.body.name;

                    newUser.save(function(err)
                    {
                        if(err)
                            throw err;

                        return done(null,newUser)
                    });
                }
            })
        })
    }));


    passport.use('local-login',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        nameField:'name',
        passReqToCallback:true
    },
    function(req,email,password,done)
    {
        User.findOne({'local.email':email}, function(err,user)
        {
            if(err)
                return done(err);

            if(!user)
                return done(null,false,req.flash('loginMessage','No user Found'));

            if(!user.validPassword(password))
                return done(null,false, req.flash('loginMessage','Wrong Password'));


            return done(null, user);
        });
    }));



    passport.use(new GoogleStrategy({

            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL

        },
        function(token, refreshToken, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function() {

                // try to find the user based on their google id
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    debugger;
                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email
                        debugger;
                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            debugger;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));




}



/*
var userverification={
    login:login,
    signup:signup,
    logout:logout
};



function login()
{

};



function signup(){

};

function logout()
{

};




module.exports=userverification;

*/
