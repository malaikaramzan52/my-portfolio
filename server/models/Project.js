const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    projectUrl: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
