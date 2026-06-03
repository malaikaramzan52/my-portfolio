const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Helper seeds
const defaultSkills = [
    { name: "HTML", imageUrl: "images/HTML.png", category: "Frontend" },
    { name: "CSS", imageUrl: "images/css.jpg", category: "Frontend" },
    { name: "Tailwind CSS", imageUrl: "images/Tailwind.png", category: "Frontend" },
    { name: "JavaScript", imageUrl: "images/Js.png", category: "Frontend" },
    { name: "Git & GitHub", imageUrl: "images/github.png", category: "Tools" }
];

// @route   GET /api/skills
// @desc    Get all skills (seeds if database is empty)
router.get('/', async (req, res) => {
    try {
        let skills = await Skill.find();
        if (skills.length === 0) {
            console.log("Seeding default skills in database...");
            skills = await Skill.insertMany(defaultSkills);
        }
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/skills
// @desc    Create a new skill
router.post('/', async (req, res) => {
    const { name, imageUrl, category } = req.body;
    try {
        const newSkill = new Skill({ name, imageUrl, category });
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
