
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register a new user in db
// @routes POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields")
    }

    // check if user exists
    const existingUser = await User.findOne({email})
    if(existingUser){
        res.status(400);
        throw new Error('User already exists')
    }

    //hash password

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    
    // upon registration of user
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    } else{
        res.status(400);
        throw new Error('Invalid user data')
    }

})

// @desc Get user
// @routes GET /api/login
// @access Private
const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!password || !email){
        res.status(400)
        throw new Error('Please fill all the credentials')
        
        
    } else if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid user data')
    }

})


//desc Gets the user info whose id is given
//method GET
//@access private  (we protect it using 'protect' middleware)
const getMe = asyncHandler(async (req, res) => {
    // const {_id, name, email} = await User.findById(req.user.id)
    // there's no need to find user again since in our auth middleware we are saving user in 
    // ' req.user ' 

    res.status(200).json(req.user)
})


const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {registerUser, loginUser, getMe}