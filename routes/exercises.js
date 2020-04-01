const router = require('express').Router()
const Exercise = require('../models/exercise.model')



router.route('/').get((request, response) => {
    Exercise.find()
    .then(exercises => response.json(exercises))
    .catch(err => response.status(400).json('Error: ' + err))
})

router.route('/:id').get( (request,response) => {
    Exercise.findById(request.params.id)
    .then(exercise => response.json(exercise))
    .catch(err => response.status(400).json('Errors: ' + err))
})


router.route('/:id').delete( (request, response) => {
    Exercise.findByIdAndDelete(request.params.id)
    .then( () => response.json('Exercise Deleted'))
    .catch( err => response.status(400).json('Error: ' +err))
})





router.route('/add').post((request,response) => {
    const requestBody = request.body
    const username = requestBody.username
    const description = requestBody.description
    const duration = Number(requestBody.duration)
    const date = Date.parse(requestBody.date)



    const newExercise = new Exercise(
        {
            username,
            description,
            duration,
            date
        }
    )

    newExercise.save()
    .then( () => response.json('Exercise Added'))
    .catch(err => response.status(400).json('Error: ' + err))
})


router.route('/update/:id').post( (request,response) =>{

    const requestBody = request.body
    const username = requestBody.username
    const description = requestBody.description
    const duration = Number(requestBody.duration)
    const date = Date.parse(requestBody.date)



    const updatedExercise = {
            username,
            description,
            duration,
            date
        }
    

    Exercise.findByIdAndUpdate(request.params.id, updatedExercise)
    .then(() => response.json('Exercise updated'))
    .catch(err => response.status(400).json('Error: ' + err))
   
})


module.exports = router