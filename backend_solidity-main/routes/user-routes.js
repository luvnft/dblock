const express = require('express')
const {createUser , getUser , updateUser, loginUser, getUserById, updateUserByPoints, updateUserByReferalPoints} = require('../controller/user-controller')


const router = express.Router();

router.post("/createUser",createUser)
router.get("/getAllUser",getUser)
router.get('/getUserId/:id',getUserById)
router.patch("/updateUser/:id",updateUser)
router.patch("/updateUserPoint/:id",updateUserByPoints)
router.patch("/updateUserByReferalPoints/:id",updateUserByReferalPoints)
router.post("/login",loginUser)


module.exports = router;