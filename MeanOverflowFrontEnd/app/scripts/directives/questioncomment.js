/**
 * Created by root on 7/12/15.
 */
angular.module('MeanOverflow').directive('questioncomment', function()
{
    return{
        restrict:"EA",
        scope:{
            question:'='

        },
        controller:'QuestioncommentCtrl',
        templateUrl:'views/questioncomment.html'
    }
})