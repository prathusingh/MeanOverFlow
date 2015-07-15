/**
 * Created by root on 7/12/15.
 */
angular.module('MeanOverflow').controller('QuestionlistCtrl', function($scope,Discussion,$log,$timeout){

   if(Discussion.data) {$scope.questionlist=Discussion.data.response;}
    else
   {
       Discussion.getQuestions().then(function(result){

           $scope.questionlist=result.response

       }, function(reason)
       {
           $log.debug('Reason '+reason);
       });
   }



    $scope.upvote=function(question)
    {
        $log.debug(question);
        Discussion.updateVoteCount(question).then(function(result)
        {
            $log.debug(result);
        },function(reason)
        {
            $log.debug('Reason '+reason);
        })
    };

    $scope.postComment=function(question,comment)
    {
        $log.debug('QuestionListCtrl');
        $log.debug(question);
        $log.debug(comment);

        Discussion.postComment(question,comment).then(function(result)
        {
            $log.debug(result);
        }, function(reason)
        {
            $log.debug('Reason '+reason);
        })
    };


    $scope.$on('questionAdded', function(event, question) {
        $scope.$apply(function () {
            //  question.new = true;
            $scope.questionlist.unshift(question);
        });
    });

        $scope.$on('voteAdded', function(event, question) {
            $scope.$apply(function () {
                //  question.new = true;
            $scope.questionlist.forEach(function(quest)
            {
                if(quest._id==question._id)
                {
                    quest.voteCount=question.voteCount;
                }
            })


            });
        });


    $scope.$on('commentAdded', function(event, question) {
        $scope.$apply(function () {
            //  question.new = true;
            $scope.questionlist.forEach(function(quest)
            {
                if(quest._id==question._id)
                {
                    quest.comments.push(question.comments.pop());
                }
            })


        });
    });


        /*
        $timeout(function() {
            delete question.new;
        }, 2000);

        */




});