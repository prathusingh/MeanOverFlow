/**
 * Created by root on 7/12/15.
 */
angular.module('MeanOverflow').controller('QuestionlistCtrl', function($scope,Discussion,$log){

    $scope.questionlist=Discussion.data.response;



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


})