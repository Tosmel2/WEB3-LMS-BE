import Quiz from "../model/quiz.js";
import validateInput from "../validation/quiz.js";



export const postQuizController = async(req, res) => {
    try {
        const {error} = validateInput(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const quiz = new Quiz ({
            courseId: req.params.id,
            description,
            questions: [],
        });
        
        await quiz.save()

        res.json({
            status: success,
            data: quiz
        })
    
    } catch (error) {
        res.json(error.message)
    }
}
export const updateQuizController = async(req, res) => {
    const {error} = validateInput(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id);

        if (!quiz){
            return res.status(404).send("quiz with such id not found")
        } else {

            await quiz.save();

            res.json({
                status: success,
                data: quiz
            })
        }
    } catch (error) {
        res.json(error.message)
    }

}

export const getAllQuizController = async(req, res) => {

    try {
        const quiz = await Quiz.find();
        
            res.json({
                status: success,
                data: quiz
            })
        
    } catch (error) {
        res.json(error.message)
    }

}

export const getOneQuizController = async(req, res) => {

    try {
        const quiz = await Quiz.find(req.params.id);
        
            res.json({
                status: success,
                data: quiz
            })
        
    } catch (error) {
        res.json(error.message)
    }

}

export const deleteQuizController = async(req, res) => {
    
    try {
        const quiz = await Quiz.findById(req.params.id)

        if (!quiz){
            return res.status(404).send("quiz not found")
        }

        await quiz.remove();

        res.json({
            status: success,
            data: quiz
        })
        
    } catch (error) {
        res.json(error.message)
    }

}

