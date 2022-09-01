const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


// @desc Get goals
// @routes GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })    //The user that we decddoed from the token (in authMiddleware)
    
    res.status(200).json(goals)
})

// @desc Set goals
// @routes SET /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400);
        throw new Error("Please add a text field")

        // return res.status(400).json({
        //     message: "Name is not entered"
        // })
    };

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc update goals
// @routes PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)
    if(goal){
        console.log('Found goal')
    }

    if(!goal){
        res.status(400)
        throw new Error("No goal of this ID found")
    }

    // const user = await User.findById(req.user.id)  //the logged in user
    // there's no need to find user again since in our auth middleware we are saving user in 
    // ' req.user ' 


    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user is the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        console.log('user not authorized')
        throw new Error('User not authorized')  //it terminates and the goal will not be updated
    } //this way we ensure only the goal creator can update his goal i.e logged in user

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
    if(updatedGoal){
        console.log('updated the goal')
        console.log(req.body)
    }
})

// @desc Delete goals
// @routes DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("No goal of this ID found")
    }
    // const user = await User.findById(req.user.id)  //the logged in user
    // there's no need to find user again since in our auth middleware we are saving user in 
    // ' req.user '

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user is the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')  //it terminates and the goal will not be deleted
    } //this way we ensure only the goal creator can delete his goal i.e logged in user

    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    if(deletedGoal){
        console.log("goal deleted")
        console.log(deletedGoal)
    }
    // or 
    // await goal.remove()

    res.status(200).json({id: deletedGoal.id})
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}