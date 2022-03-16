const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

exports.register = async (req, res, next) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
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
        res.send(savedUSer);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.login = async (req, res, next) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try{
        //Check if email exists
        const user =  await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Invalid login details');

        //Check if password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid login details');

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
        
    }catch(err){
        res.status(400).send(err);
    }
}