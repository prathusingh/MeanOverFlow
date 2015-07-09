'use strict';

// Declare app level module which depends on views, and components
angular.module('MeanOverflow', [
  'ngRoute',
  'ngResource'

]).
config(['$routeProvider', function($routeProvider) {
   $routeProvider.
       when('/',{
           templateUrl:'./views/login.html',
           controller:'LoginController'
       }).
       when('/login',{
           templateUrl:'./views/login.html',
           controller:'LoginController'
       }).

       when('/signup',{
           templateUrl:'./views/signup.html',
           controller:'SignUpController'

       }).
       when('/discussionform',{
           templateUrl:'./views/discussionform.html',
           controller:'DiscussionFormController'

       });

}])
.factory('$exceptionHandler', function() {
    return function(exception, cause) {
        exception.message += ' (caused by "' + cause + '")';
        throw exception;
    };
})


.run(function($rootScope, $log,$window)
{
    $rootScope.$log=$log;
    $rootScope.$window=$window;
    $rootScope.user='';

})

