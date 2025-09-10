import mongoose, {Schema, model } from "mongoose";

interface Subject {
    name:String   //subject name
    code:String   //subject code this will be uunique
    faculty:mongoose.Types.ObjectId; //userrole ="faculty"
    students:mongoose.Types.ObjectId; //array of the student
}

const subjectSchema = new Schema({
    name:{type:String, required:true, trim:true },
    code:{type:String, require:true, unique:true, uppercase:true},
    faculty:{type:Schema.Types.ObjectId, ref:"User", required: true},
    students:[{type:Schema.Types.ObjectId, ref:"User"}]
},
  {timestamps: true}
)

export const Subjectmodel = model("subjectmodel", subjectSchema)