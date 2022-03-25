const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    img_path: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('memory', memorySchema);