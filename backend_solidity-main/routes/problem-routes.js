const express = require('express')
const { getAllProblem, addProblem, updateProblem } = require('../controller/problem-controller')

const router = express.Router()

router.post('/AddProblem',addProblem)
router.get('/AllProblem',getAllProblem)
router.patch("/updateProblem/:id",updateProblem)

module.exports = router