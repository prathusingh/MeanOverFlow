/**
 * Created by root on 7/6/15.
 */
var discussion=
{
    data:discussionForm
}

function discussionForm(req,res)
{
    debugger;

    console.log("discussion form");

    /*

    if (req.method === 'OPTIONS') {
        console.log('!OPTIONS');
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    }

    */
   // else {

        var result = {
            user: req.user.local.name || req.user.google.name,
            response: ['node', 'angular', 'mongo', 'express']

        }
    debugger;
        res.send(result);
   // }

}



module.exports=discussion;