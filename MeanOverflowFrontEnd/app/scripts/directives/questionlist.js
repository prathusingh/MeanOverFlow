/**
 * Created by root on 7/12/15.
 */
angular.module('MeanOverflow').directive('questionlist', function()
{
    return{
        restrict:"EA",
        scope:{},
        controller:'QuestionlistCtrl',
        templateUrl:'views/questionlisttpl.html'
    }
})
