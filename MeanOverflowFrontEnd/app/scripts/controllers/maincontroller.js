/**
 * Created by root on 7/8/15.
 */
angular.module("MeanOverflow").controller('MainController', function($scope,User,$window,$log,$rootScope)
{


   // $scope.response=Discussion.data.response;

    $scope.logout=function()
    {
        User('logout').then(function(result)
        {

            $rootScope.val=false;
            $window.location.href=('#login');

        }, function(reason)
        {

            $rootScope.val=false;
            $window.location.href=('#login');
        });
    }

});