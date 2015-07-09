/**
 * Created by root on 7/7/15.
 */

angular.module('MeanOverflow').factory('Discussion', function(){

    var discussionService={};


    discussionService.setDiscussion=function (data)
    {
        discussionService.data=data;

    }

    return discussionService;
});
