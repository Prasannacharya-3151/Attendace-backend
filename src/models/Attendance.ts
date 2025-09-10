import mongoose, { Schema, model } from "mongoose";

interface Attendace {
    student: mongoose.Types.ObjectId; //student referance
    subject: mongoose.Types.ObjectId;  //subject reerance
    faculty:mongoose.Types.ObjectId; //who mark the attandace
    date:Date;  //date of the attendace
    status: "present" | "absent" | "leave";   //present and absent 
}

const attendaceSchema = new Schema ({
    student:{ type:Schema.Types.ObjectId, ref:"User", required:true },
    subject:{ type:Schema.Types.ObjectId, ref:"Subject", reqired:true},
    faculty:{type:Schema.Types.ObjectId, ref:"User", required:true},
    date:{ type:Date, required:true},
    status:{
        type:String,
        enum:["present", "absent", "leave"],
        required:true,
    }
},
{timestamps:true}
)