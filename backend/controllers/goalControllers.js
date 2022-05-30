const asyncHandler = require('express-async-handler');


// @desc Get goals
// @routes GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "Get goals"
    })
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

    res.status(200).json({
        message: "Set goal"
    })
})

// @desc update goals
// @routes PUT /api/goals/:id
// @access Private

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Update goal ${req.params.id}`
    })
})

// @desc Delete goals
// @routes DELETE /api/goals/:id
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {

    res.status(200).json({
        message: `Delete goal ${req.params.id}`
    })
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}