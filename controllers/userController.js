const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../Helpers/validation');

exports.register = async (req, res) => {

    //Validate Request
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({
        success: false,
        errorMessage: error.details[0].message
    });
    
    //Check if email exists
    const emailExixts =  await User.findOne({email: req.body.email});
    if(emailExixts) return res.status(400).send('Email already exists');

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    
    try{
        const savedUSer = await user.save();
        res.send({
            success: true,
            message: "Registration Successful",
            data: savedUSer
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }
}

exports.login = async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({
        success: false,
        errorMessage: error.details[0].message
    });

    try{
        //Check if email exists
        const user =  await User.findOne({email: req.body.email});
        if(!user) return res.status(401).send({
            success: false,
            errorMessage: "Invalid Login Details"
        });

        //Check if password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(401).send({
            success: false,
            errorMessage: "Invalid Login Details"
        });;

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(200).header('auth-token', token).send({
            success: true,
            message: "Login Successful",
            data: {
                token: token,
                user: user
            }
        });
        
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.getUser = async (req, res) => {

    try{
        const user = await User.findById(req.user._id);
        res.status(200).send({
            success: true,
            message: "User Gotten Successfully",
            data: user
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}