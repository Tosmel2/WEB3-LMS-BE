import {
  deleteQuizController,
  getAllQuizController,
  getOneQuizController,
  postQuizController,
  updateQuizController,
} from '../controller/quiz.js'
import express from 'express'

const quizRoute = express.Router()

//post quiz
quizRoute.post('/quizzes', postQuizController)
//update quiz
quizRoute.put('/quizzes/:id', updateQuizController)
//get all quiz
quizRoute.get('/quizzes/', getAllQuizController)
//get one quiz
quizRoute.get('/quizzes/:id', getOneQuizController)
//delete quiz
quizRoute.delete('/quizzes/:id', deleteQuizController)

export default quizRoute
