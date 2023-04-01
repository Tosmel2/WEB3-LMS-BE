import express from 'express';
import * as Instructor from '../controller/Instructor/instructorController.js';

const instructorRoutes = express.Router();

instructorRoutes.post('/instructors', Instructor.createInstructor);
instructorRoutes.get('/instructors', Instructor.getInstructors);
instructorRoutes.get('/instructors/:id', Instructor.getInstructorById);
instructorRoutes.get('/instructors/:id', Instructor.approveInstructor);
instructorRoutes.get('/instructors/:id/approve', Instructor.getCoursesByInstructorId);
instructorRoutes.get('/instructors/:id/reject', Instructor.getStudentsByInstructorId);
instructorRoutes.get('/instructors/:id/comments', Instructor.getCommentsByInstructorId);
instructorRoutes.post('/instructors/:id/comments', Instructor.addCommentToInstructor);

export default instructorRoutes;

