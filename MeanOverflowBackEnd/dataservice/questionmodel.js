/**
 * Created by root on 7/12/15.
 */
/**
 * Created by root on 7/10/15.
 */
var mongoose=require('mongoose');



var questionSchema=mongoose.Schema(
    {
        text :String,
        postedBy: String,
        category: String,
        voteCount: Number,

        comments: [
            {
                commentText: String,
                commentBy: String,
                commentVoteCount: Number
            }
        ]

    }
);








module.exports=mongoose.model('Question', questionSchema);
