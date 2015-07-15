/**
 * Created by root on 7/7/15.
 */

angular.module('MeanOverflow').factory('Discussion', function($resource,$q,$log,$rootScope,$location){

    var discussionService={};
   // var res=$resource("http://localhost:8080/api/question/:id")
    var rootUrl='http://localhost:8080';
    //var apiRootUrl='http://localhost:8080/api';
    var apiRootUrl=rootUrl+'/api';
    broadcastEvents();

    var res2=$resource(
        apiRootUrl+'/getQuestions'
    );


    var res1=$resource(
        apiRootUrl  + '/question/:id',
        { id: '@id' },

         { comment: {
         method: 'POST',
         url: apiRootUrl + '/question/:id/comment' }
         }
    );




    var res=  $resource(
       apiRootUrl  + '/question/:id',
        { id: '@id' },

        { vote: {
            method: 'GET',
            url: apiRootUrl + '/question/:id/vote' }
        }
       /*
        {
            comment:{
                method: 'POST',
                url: apiRootUrl+'/question/:id/comment'



                //Need to add comment in this post request

            }
        }

        */


    );



    discussionService.setDiscussion=function (data)
    {
        discussionService.data=data;
      //  $log.debug('Discussion Service');
       // $log.debug(discussionService.data);

    }

    var deferred=$q.defer();

    discussionService.setQuestion=function(id,content)
    {
        res.save(id,content,function(result)
        {
            deferred.resolve(result);
        }, function(reason)
        {
            deferred.reject(reason);
        })

        return deferred.promise;
    }

    discussionService.updateVoteCount=function(question)
    {
       // $log.debug(question._id);
     res.vote({id:question._id}, function(result)
     {
         deferred.resolve(result);
     }, function(reason)
     {
         deferred.resolve(reason);
     });

        return deferred.promise;
    }

    discussionService.postComment=function(question,comment)
    {
        $log.debug('service');
        $log.debug(question);
       // $log.debug(comment._id);
        $log.debug(comment);
      //  $log.debug(JSON.stringify(question));
       // var i=5536;


     res1.comment({id:question._id},{comment:comment},function(result)

     {
         deferred.resolve(result);
     }, function(reason)
     {
         deferred.resolve(reason);

     });

        return deferred.promise;

    }


    discussionService.getQuestions=function()
    {
        res2.query(function(result){

            deferred.resolve(result);

        }, function(reason)
        {
           deferred.resolve(reason);
        });

        return deferred.promise;
    }

    return discussionService;




    function broadcastEvents()
    {
        var socket=window.io.connect(rootUrl);
        socket.on('questionAdded', function(newquestion)
        {
            $rootScope.$broadcast('questionAdded',newquestion);
        });

        socket.on('voteAdded', function (voteQuestion) {
            $rootScope.$broadcast('voteAdded', voteQuestion);
        });

        socket.on('commentAdded', function (commentQuestion) {
            $rootScope.$broadcast('commentAdded', commentQuestion);
        });
    }


});
