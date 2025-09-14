import mongoose, {Schema, model } from "mongoose";

interface SubjectOffering {
    subject: mongoose.Types.ObjectId;   //referance from a subject master code
    faculty:mongoose.Types.ObjectId; //userrole ="faculty" faculty id like a F001
    students:mongoose.Types.ObjectId; //array of the student
    branch: "CSE" | "AIML" | "DS" | "ISE" | "CSD" | "IOT" | "ME" | "CV" | "AG" | "AS";
    semester:"1SEM" | "2SEM" | "3SEM" | "4SEM" | "5SEM" | "6SEM" | "7SEM" | "8SEM";
    section:"A"|"B"|"C"|"D";
    academicYear: string; 
    
}

const subjectOfferingSchema = new Schema({
    subject:{type:Schema.Types.ObjectId, required:true, ref:"SubjectMaster" },
    faculty:{type:Schema.Types.ObjectId, ref:"User", required: true},
    students:[{type:Schema.Types.ObjectId, ref:"User"}],
    branch: {type:String, enum:["CSE","AIML","DS","ISE","CSD","IOT","ME","CV","AG","AS"], required:true, trim:true},
    semester: {type:String, enum:["1SEM" , "2SEM" , "3SEM" , "4SEM" , "5SEM" , "6SEM" , "7SEM" , "8SEM"], required:true, trim:true},
    section: {type:String, enum:["A", "B", "C", "D"], required:true, trim:true},
    acadenicYear: {type:String, required: true},
},
  {timestamps: true}
)

export const SubjectOfferingModel = model("SubjectOffering", subjectOfferingSchema)