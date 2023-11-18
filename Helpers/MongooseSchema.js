import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    mentorName: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    studentsAssigned: {
        type: Array,
        required: true,
        default: []
    },
    experience: {
        type: String,
        required: true,
        default: 0
    }
})

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    mentor: {
        type: String,
        default: ""
    },
    qualification: {
        type: String,
        required: true,
    },
    perivousMentor: {
        type: String,
        default: ""
    },
})

export const MentorSchema = mongoose.model("mentors", mentorSchema);
export const StudentSchema = mongoose.model("students", studentSchema);