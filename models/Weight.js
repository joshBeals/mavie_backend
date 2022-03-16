const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Weight', weightSchema);