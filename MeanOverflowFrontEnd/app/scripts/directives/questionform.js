/**
 * Created by root on 7/12/15.
 */
angular.module('MeanOverflow')
    .directive('questionform', function() {
        return {
            restrict: "EA",
            scope: {},
            controller: 'QuestionformCtrl',
            templateUrl: 'views/questionformtpl.html'
        };
    });