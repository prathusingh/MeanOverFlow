/**
 * Created by root on 7/13/15.
 */

angular.module('MeanOverflow').controller('NewCommentCtrl', function($scope,$log){


    $scope.commitComment=function(){
        $log.debug('NewCommentCtrl');
        $log.debug($scope.comment);
        $log.debug($scope.question);

        $scope.post({comment:$scope.comment},{question:$scope.question});
        $scope.comment=null;

    }

});
