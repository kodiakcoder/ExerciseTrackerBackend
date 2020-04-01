const router = require('express').Router()


let User = require('../models/user.model')


router.route('/').get( (request,response) => {
    console.log('Get Request')
    
    
    User.find()
    .then(users => response.json(users))
    .catch(err => response.status(400).json('Errors:  + err'))
    

})



router.route('/add').post( (request,response) => {
    console.log('Add Request')
    const username = request.body.username

    const newUser = new User({username})

    newUser.save()
    .then(() => response.json('User Added'))
    .catch( err => response.status(400).json('Error: ' + err))
})

module.exports = router