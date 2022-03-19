const Weight = require('../models/Weight');
const { weightValidation } = require('../Helpers/validation');

exports.addWeight = async (req, res) => {
    
    //Validate Request
    const { error } = noteValidation(req.body);
    if (error) return res.status(400).send({
        success: false,
        errorMessage: error.details[0].message
    });

    // Create New Note
    weight = new Weight({
        user_id: req.user._id,
        weight: req.body.weight
    });

    try{
        const newWeight = await weight.save();
        res.status(201).send({
            success: true,
            message: "Weight Added Successfully",
            data: newWeight
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.deleteWeight = async (req, res) => {

    try{
        await Weight.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Weight deleted successfully"
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.getWeights = async (req, res) => {

    try{
        const weights = await Weight.find({ user_id: req.user._id });
        res.status(200).send({
            success: true,
            message: "Weights Gotten Successfully",
            data: weights
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.getWeight = async (req, res) => {

    try{
        const weight = await Weight.find({ _id: req.params.id, user_id: req.user._id });
        res.status(200).send({
            success: true,
            message: "Weight Gotten Successfully",
            data: weight
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}