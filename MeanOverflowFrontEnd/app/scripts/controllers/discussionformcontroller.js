/**
 * Created by root on 7/5/15.
 */

angular.module('MeanOverflow').controller('DiscussionFormController', function($scope,User,Discussion,$window,$rootScope)
{

    $rootScope.val=true;
    $rootScope.user=Discussion.data.user;




//   $scope.user=Discussion.data.user;
   $scope.response=Discussion.data.response;




});
