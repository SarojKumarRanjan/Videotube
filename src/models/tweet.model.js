import  mongoose,{ Schema, model } from "mongoose";
import mongooseaggregatepaginate from "mongoose-aggregate-paginate-v2"

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
},
{
    timestamps: true,
})

tweetSchema.plugin(mongooseaggregatepaginate)

export  const Tweet = model("Tweet", tweetSchema);

 