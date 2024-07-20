import mongoose,{ Schema, model } from "mongoose";
import mongooseaggregatepaginate from "mongoose-aggregate-paginate-v2"


const commentSchema = new Schema(
    {
       content:{
        type:String,
        required:true
       },
       video: {
        type: mongoose.Types.ObjectId,
        ref: "Video",
        
      },
      owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        
      },
    },
    {
      timestamps: true,
    }
  
);


commentSchema.plugin(mongooseaggregatepaginate)

export const Comment = model("Comment", commentSchema);