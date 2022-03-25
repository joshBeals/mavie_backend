const Memory = require('../models/Memory');
const { memoryValidation } = require('../Helpers/validation');
const { cloudinary } = require('../Helpers/cloudinary');

exports.addMemory = async (req, res) => {
    
    //Validate Request
    const { error } = memoryValidation(req.body);
    if (error) return res.status(400).send({
        success: false,
        errorMessage: error.details[0].message
    });

    //Save image in cloudinary
    const upload = await cloudinary.uploader.upload(req.body.img_path, {
        folder: 'mavie'
    });

    // Create New Note
    memory = new Memory({
        user_id: req.user._id,
        img_path: upload.url,
        description: req.body.description
    });

    try{
        const newMemory = await memory.save();
        res.status(201).send({
            success: true,
            message: "Memory Added Successfully",
            data: newMemory
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.deleteMemory = async (req, res) => {

    try{
        await Memory.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Memory deleted successfully"
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.getMemories = async (req, res) => {

    try{
        const memories = await Memory.find({ user_id: req.user._id });
        res.status(200).send({
            success: true,
            message: "Memory Gotten Successfully",
            data: memories
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.getMemory = async (req, res) => {

    try{
        const memory = await Memory.find({ _id: req.params.id, user_id: req.user._id });
        res.status(200).send({
            success: true,
            message: "Note Gotten Successfully",
            data: memory
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}