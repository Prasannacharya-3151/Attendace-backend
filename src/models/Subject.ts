import mongoose, {Schema, model } from "mongoose";

interface Subject {
    name:string   //subject name
    code:string   //subject code this will be uunique
    faculty:mongoose.Types.ObjectId; //userrole ="faculty"
    students:mongoose.Types.ObjectId; //array of the student
    branch: "CSE" | "AIML" | "DS" | "ISE" | "CSD" | "IOT" | "ME" | "CV" | "AG" | "AS";
    semester:"1SEM" | "2SEM" | "3SEM" | "4SEM" | "5SEM" | "6SEM" | "7SEM" | "8SEM";
    section:"A"|"B"|"C"|"D";
    subject?:mongoose.Types.ObjectId[];
}

const subjectSchema = new Schema({
    name:{type:String, required:true, trim:true },
    code:{type:String, required:true, unique:true, uppercase:true},
    faculty:{type:Schema.Types.ObjectId, ref:"User", required: true},
    students:[{type:Schema.Types.ObjectId, ref:"User"}],
    branch: {type:String, enum:["CSE","AIML","DS","ISE","CSD","IOT","ME","CV","AG","AS"], required:true, trim:true},
    semester: {type:String, enum:["1SEM" , "2SEM" , "3SEM" , "4SEM" , "5SEM" , "6SEM" , "7SEM" , "8SEM"], required:true, trim:true},
    section: {type:String, enum:["A", "B", "C", "D"], required:true, trim:true},
    subject:{type:Schema.Types.ObjectId, ref: "Subject"},
},
  {timestamps: true}
)

export const Subjectmodel = model("subjectmodel", subjectSchema)