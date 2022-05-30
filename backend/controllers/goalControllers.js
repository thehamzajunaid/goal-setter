const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')


// @desc Get goals
// @routes GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    
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
        text: req.body.text
    })

    res.status(200).json(goal)
})

// @desc update goals
// @routes PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("No goal of this ID found")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
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

    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)

    // or 
    // await goal.remove()

    res.status(200).json({id: deletedGoal.id})
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}