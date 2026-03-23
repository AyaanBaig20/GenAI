import mongoose from "mongoose"

let technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },

},{
    _id:false
})
let behavioralQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },

},{
    _id:false
})
let skillsGapSchema= new mongoose.Schema({
    skills:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:true
    }
},{
    _id:false
})
let preperationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:true,
    },
    task:[
        {
            type:String
        }
    ]
},{
    _id:false
})

let interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:true
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
        required:true
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillsGap:[skillsGapSchema],
    preparationPlan:[preperationPlanSchema],
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
}
},{
    timestamps:true
})

let interviewReportModel = mongoose.model("interviewReport",interviewReportSchema)
export default interviewReportModel