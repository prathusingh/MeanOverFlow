/**
 * Created by root on 7/13/15.
 */
angular.module('MeanOverflow').directive('newcomment',function()
{
    return{
        restrict:"EA",
        scope:{
            question:'@',
            post:'&'
        },
        controller:'NewCommentCtrl',
        templateUrl:'views/newcommenttpl.html'



    }
});