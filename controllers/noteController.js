const Note = require('../models/Note');
const { noteValidation } = require('../Helpers/validation');

exports.addNote = async (req, res) => {
    
    //Validate Request
    const { error } = noteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create New Note
    note = new Note({
        user_id: req.user._id,
        title: req.body.title,
        content: req.body.content
    });

    try{
        const newNote = await note.save();
        res.status(201).send({
            success: true,
            message: "Note Added Successfully",
            data: newNote
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.editNote = async (req, res) => {

    //Validate Request
    const { error } = noteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try{
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true});

        res.status(200).send({
            success: true,
            message: "Note Edited Successfully",
            data: updatedNote
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }


}

exports.getNotes = async (req, res) => {

    try{
        const notes = await Note.find({ user_id: req.user._id });
        res.status(200).send({
            success: true,
            message: "Notes Gotten Successfully",
            data: notes
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}

exports.getNote = async (req, res) => {

    try{
        const note = await Note.find({ _id: req.params.id, user_id: req.user._id });
        res.status(200).send({
            success: true,
            message: "Note Gotten Successfully",
            data: note
        });
    }catch(err){
        res.status(400).send({
            success: false,
            errorMessage: err
        });
    }

}