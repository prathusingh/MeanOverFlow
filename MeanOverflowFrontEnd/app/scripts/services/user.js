/**
 * Created by root on 7/6/15.
 */
'use-strict'

angular.module('MeanOverflow').factory('User', function($resource,$q,$log)
{



   return  function (params,content) {
        var res=$resource("http://localhost:8080/api/:id")

        var deferred=$q.defer();

        if(params=='login') {

            res.save({id: 'login'}, content,function (result) {

                    deferred.resolve(result)
                }, function (reason) {
                    deferred.reject('Server is Down');
                }
            );
        }

        else if(params=='signup')
        {


            res.save({id:'signup'}, content,function(result) {
                deferred.resolve(result)
            },function(reason){
                deferred.reject('Server is down');
            });
        }

        else if(params=='logout')
        {
            res.get({id:'logout'}, function(result)
            {
                deferred.resolve(result);
            }, function(reason)
            {
                deferred.reject('Server is Down');

            })
        }

       else if(params=='googlelogin')
        {

            $resource("http://localhost:8080/auth/google").get( function(result)
            {
                deferred.resolve(result);
            }, function(reason)
            {
                deferred.reject('Server is Down');

            })
        }

         return deferred.promise;

    }







});