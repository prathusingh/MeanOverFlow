/**
 * Created by root on 7/5/15.
 */

angular.module('MeanOverflow').controller('SignUpController', function($scope,User,Discussion,$window,$log,$rootScope)
{

    $scope.register={};
    $rootScope.val=false;







    $scope.signup=function()
    {
       // $log.debug($scope.register);
        if($scope.register.password != $scope.register.repassword)
        {
           $scope.register={}
        }
        User('signup',$scope.register).then(function(result)
        {
            $log.debug(result);

            if(result=="Invalid Signup")
            {
                $scope.register={}
                $window.location.href=('#signup');
            }
            else {
                $scope.register={}
                Discussion.setDiscussion(result);

                $window.location.href = ('#discussionform');
            }


        }, function(reason)
        {
            $log.debug(reason);
            $scope.register={};
            $window.location.href=('#signup');
        });
    }

});
