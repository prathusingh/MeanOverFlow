/**
 * Created by root on 7/5/15.
 */

angular.module('MeanOverflow').controller('LoginController', function($scope,User,Discussion,$window,$location,$rootScope,$log)
{

    $scope.signin={};
    $rootScope.val=false;





    $scope.login=function()
    {

         User('login',$scope.signin).then(function(result)
         {
            // $log.debug(JSON.stringify(result));
             if(result=="Invalid Login")
             {
                 $scope.sigin={};
                 $window.location.href=('#login');
             }
             else {
                 $scope.sigin={};
                 Discussion.setDiscussion(result);

                 $window.location.href = ('#discussionform');
             }

         }, function(reason)
         {
             $log.debug('Reason Login '+reason);
             $scope.sigin={};
             $window.location.href=('#login');
         });
    }

    $scope.googlelogin=function()
    {
        User('googlelogin').then(function(result)
        {

            if(result=="Invalid Login")
            {

                $window.location.href=('#login');
            }
            else {

                Discussion.setDiscussion(result);

                $window.location.href = ('#discussionform');
            }

        }, function(reason)
        {

            $window.location.href=('#login');
        });

    }



});
