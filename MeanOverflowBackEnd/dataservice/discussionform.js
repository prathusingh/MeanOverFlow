/**
 * Created by root on 7/6/15.
 */


var Question=require('./questionmodel');
var User=require('./usermodel');
var notifier=require('./notifier');
var discussion=
{
    setQuestion:setQuestion,
    getQuestions:getQuestions,
    upvote:upvote,
    comment:comment

}



function setQuestion(req,res, next) {
    var questionText = req.body.text;


    Question.findOne({text: questionText}, function (err, question) {
        if (err) {
            return next(err);
        }

        if (question) {
            console.log('Question repeated');
            debugger;
            err = new Error('That question has been asked already');
            err.status = 403; // forbidden
            return next(err);
        }

        User.findOne({_id: req.user.id}, function (err, user) {
            if (err) {return next(err);};

            var userName = user.local.name;
            var newQuestion = Question({
                text: questionText,
                postedBy: userName,
                category: req.body.category
            });

            newQuestion.save(function (err) {
                if (err) return next(err);
                notifier.questionAdded(newQuestion);
                res.send({message: "Successfully saved"});

            });


        });
    });
}




function getQuestions(req,res,next)
{

    var result={};
    result.user= req.user.local.name || req.user.google.name;

    Question.find( function(err,questions)
    {
        if(err) return next(err);
       // console.log(questions);

        result.response=questions;
        res.send(result);
        //console.log(result);
    })

    /*
    var result = {
        user: req.user.local.name || req.user.google.name,
        response: ['node', 'angular', 'mongo', 'express']

    };

    */




}


function upvote(req,res,next)
{
  //  console.log('Inside Upvote');
    //console.log(req.params.id);
    Question.findOne({_id:req.params.id}, function(err,question)
    {
        console.log(question);
        if(err) return next(err);
        if(question.voteCount==undefined)
        {
            question.voteCount=1;
        }
        else{question.voteCount=question.voteCount+1;}
        //console.log(question.voteCount);
        question.save(function(err)
        {
            if(err) return next(err);
           notifier.voteAdded(question);
            //res.send({voteCount:question.voteCount});
            res.send({message:'Vote Updated'});
        })
    });
}


function comment(req,res,next)
{

    var username=null;
    User.findOne({_id:req.user.id}, function(err, user)
    {
        username=user.local.name;
        console.log(username);
    })
    Question.findOne({_id:req.params.id}, function(err,question)
    {
        if(err) return next(err);

        question.comments.push({commentText:req.body.comment, commentBy:username});
       // console.log(question);
        question.save(function(err)
        {
            if(err) return next(err);
          notifier.commentAdded(question);
            res.send({message:"Comment Pushed"});
        })

       // res.send({comment:question.comments});

    });

}






module.exports=discussion;