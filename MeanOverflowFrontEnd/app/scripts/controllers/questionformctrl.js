/**
 * Created by root on 7/12/15.
 */
angular.module('MeanOverflow').controller('QuestionformCtrl', function($scope, $log,Discussion)
{
    $scope.question={};
    $scope.submitQuestion=function()
    {
        Discussion.setQuestion(null,$scope.question).then(function(result){
            $scope.question={};

            $log.debug(result);
        }, function(reason)
        {
            $scope.question={};
            $log.debug('Reason SetQuestion '+reason);
        })
    }
})