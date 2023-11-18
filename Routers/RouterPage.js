import express from 'express';
import { MentorSchema, StudentSchema } from '../Helpers/MongooseSchema.js';

const router = express.Router();

//Welcome page

router.get("/", async (req, res) => {
    res.status(200).json({ message: "Assign Mentor Task" })
})

//Unassigned students list

router.get('/unassignedStudents', async (req, res) => {
    try {
        const unassignedStudentsList = await StudentSchema.find({ mentor: "" });
        if (unassignedStudentsList.length === 0) {
            return res.status(400).json({ message: "All the students have mentor" })
        }
        res.status(200).json({ message: "Mentors un assigned students", unassignedStudentsList })
    } catch (error) {
        res.status(500).json({ message: "Unable to get the data...Try again later..." })
    }
})

//Mentors list

router.get('/mentors', async (req, res) => {
    try {
        const mentorsList = await MentorSchema.find();
        if (!mentorsList) {
            return res.status(400).json({ message: "No mentors present" })
        }
        res.status(200).json({ message: "Mentors assigned to the students", mentorsList })
    } catch (error) {
        res.status(500).json({ message: "Unable to get the data...Try again later..." })
    }
})
router.get('/students', async (req, res) => {
    try {
        const studentsList = await StudentSchema.find();
        if (!studentsList) {
            return res.status(400).json({ message: "No students present" })
        }
        res.status(200).json({ message: "students assigned to the students", studentsList })
    } catch (error) {
        res.status(500).json({ message: "Unable to get the data...Try again later..." })
    }
})

//Adding new mentors

router.post('/addmentor', async (req, res) => {
    try {
        const newMentor = await MentorSchema({
            mentorName: req.body.mentorName,
            qualification: req.body.qualification,
            experience: req.body.experience,
            studentsAssigned: req.body.studentsAssigned
        }).save();
        res.status(200).json({ message: "New mentor added", newMentor })
    } catch (error) {
        res.status(500).json({ message: "Unable to add new mentor" })
    }
})

//Adding new students

router.post('/addstudent', async (req, res) => {
    try {
        const newStudent = await StudentSchema({
            studentName: req.body.studentName,
            mentor: req.body.mentor,
            qualification: req.body.qualification,
            priviousMentor: req.body.priviousMentor
        }).save();
        res.status(200).json({ message: "New student added", newStudent })
    } catch (error) {
        res.status(500).json({ message: "Unable to add new student", error })
    }
})

//Assigning new mentor and editing the existing mentor to the students

router.put('/assignMentor', async (req, res) => {
    try {
        const student = await StudentSchema.findOne({ studentName: req.body.studentName });
        if (!student) {
            return res.status(400).json({ message: "No student found with this name" });
        }
        const mentor = await MentorSchema.findOne({ mentorName: req.body.mentorName });
        if (!mentor) {
            return res.status(400).json({ message: "No mentor found with this name" });
        }
        //Student assigning to mentor

        const assignedStudent = [...mentor.studentsAssigned, req.body.studentName];
        const assignStudent = await MentorSchema.updateOne({ mentorName: req.body.mentorName }, { $set: { "studentsAssigned": assignedStudent } });

        //Mentor assigning to student

        const previousMentorName = student.mentor;
        const newMentor = req.body.mentorName;

        const assignMentor = await StudentSchema.updateOne({ studentName: req.body.studentName }, { $set: { "mentor": newMentor, "perivousMentor": previousMentorName } });

        res.status(200).json({ message: `${req.body.mentorName} assigned to ${req.body.studentName} `, assignStudent, assignMentor });
    } catch (error) {
        res.status(500).json({ message: "Unable to assign mentor...Try again later...", error })
        console.log(error)
    }
})

export const RouterPage = router;