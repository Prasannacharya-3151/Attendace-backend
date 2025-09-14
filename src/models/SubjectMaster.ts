import mongose, {Schema, model } from "mongoose";

interface SubjectMaster{
    name: string;  //suject name
    code: string; //subject code
}


const subjectMasterSchema = new Schema({
    name:{type:String, required: true, trim:true},
    code:{ type:String, required: true, unique: true, uppercase: true},
},
 { timestamps: true }
);

export const SubjectMasterSchema = model("SubjectMaster", subjectMasterSchema);