import mongoose, { Schema } from "mongoose";

const taskSchema= new Schema({
    title:{
        type:String,
        required:[true,"Task title is required "],
        trim:true,
        maxLength:120,
    },
    description:{
        type:String,
        trim:true,
        maxLength:1000,
    },
    category:{
        type:String,
        enum:["Work","Study","Personal","Other"],
        default:"Other",
        required:true,
    },
     priority: {
     type:String,
     enum:["High","Medium","Low"],
     default:"Low",
    },

    due_date:{
        type:Date,
    },
    complete:{
        type:Boolean,
        default:false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // relation to User model
        required: true,
    },
},
{timestamps:true},
);
taskSchema.index({ complete: 1, category: 1, priority: 1, due_date: -1 });
taskSchema.index({ title: "text", description: "text" });
export const Task=mongoose.model("Task",taskSchema);