const express = require('express');
const router = express.Router();


const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalControllers')

router.get('/', getGoals)
router.put('/:id', updateGoal)
router.post('/', setGoal)
router.delete('/:id', deleteGoal)

module.exports = router;