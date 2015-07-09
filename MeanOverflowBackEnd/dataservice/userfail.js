/**
 * Created by root on 7/7/15.
 */

var fail={
    loginfail:loginfail,
    signupfail:signupfail
}



function loginfail(req,res)
{
    res.send("Invalid Login");
}




function signupfail(req,res)
{
    res.send("Invalid Signup");
}


module.exports=fail;