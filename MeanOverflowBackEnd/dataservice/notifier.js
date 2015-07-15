/**
 * Created by root on 7/14/15.
 */
module.exports={
    listen:listen,
    questionAdded:questionAdded,
    voteAdded:upvote,
    commentAdded:pushComment
};



var io;
function listen(server)
{
  io=require('socket.io')(server);
  module.exports.listen=function(){};
}



function questionAdded(newquestion)
{
 io.sockets.emit('questionAdded',newquestion);
 console.log('Notifier#questionAdded: '+newquestion.text);
}





function upvote(votequestion) {

    io.sockets.emit('voteAdded', votequestion);
    console.log('Notifier#voteforquestionAdded: ' + votequestion.text);
}




function pushComment(commentquestion)
{
    io.sockets.emit('commentAdded',commentquestion);
    console.log('Notifier#commentforquestAdded: '+commentquestion.text);
}



