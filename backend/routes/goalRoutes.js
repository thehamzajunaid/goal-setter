const express = require('express');
const router = express.Router();


const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalControllers')
const {protect} = require('../middleware/authMiddleware')

router.get('/',protect, getGoals)
router.put('/:id',protect, updateGoal)
router.post('/',protect, setGoal)
router.delete('/:id',protect, deleteGoal)

module.exports = router;