const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Helper seeds
const defaultProjects = [
    {
        title: "Tesla Homepage Clone",
        description: "A simple responsive clone of Tesla's homepage using HTML, Tailwind CSS, and basic JavaScript (for the hero slider).",
        imageUrl: "images/tesla.png",
        tags: ["HTML", "CSS", "Tailwind"],
        projectUrl: "https://malaikaramzan52.github.io/Task_3/",
        githubUrl: "https://github.com/malaikaramzan52"
    },
    {
        title: "Currency Converter",
        description: "The Currency Converter Web Application is a responsive and interactive frontend project developed using HTML, CSS, and JavaScript. It allows users to convert currency values between different countries in real time by fetching accurate exchange rates from a third-party Currency Exchange API.",
        imageUrl: "images/cc.png",
        tags: ["JavaScript", "API", "CSS"],
        projectUrl: "https://malaikaramzan52.github.io/Currency-Converter/",
        githubUrl: "https://github.com/malaikaramzan52"
    },
    {
        title: "Phoenix Homepage Clone",
        description: "A modern, responsive Admin Dashboard cloned from Phoenix UI. This dashboard showcases an elegant layout with navigation, widgets, charts, tables, and user interface components tailored for admin panel functionality.",
        imageUrl: "images/ppp.png",
        tags: ["HTML", "CSS", "JavaScript"],
        projectUrl: "https://malaikaramzan52.github.io/Task_4/",
        githubUrl: "https://github.com/malaikaramzan52"
    },
    {
        title: "Task Scheduler",
        description: "A simple and interactive Time Scheduler Web App to add, manage and remove tasks based on priority and deadline using DOM manipulation.",
        imageUrl: "images/final.png",
        tags: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
        projectUrl: "https://malaikaramzan52.github.io/Task-Schedular/",
        githubUrl: "https://github.com/malaikaramzan52"
    }
];

// @route   GET /api/projects
// @desc    Get all projects (seeds if database is empty)
router.get('/', async (req, res) => {
    try {
        let projects = await Project.find();
        if (projects.length === 0) {
            console.log("Seeding default projects in database...");
            projects = await Project.insertMany(defaultProjects);
        }
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/projects
// @desc    Create a new project
router.post('/', async (req, res) => {
    const { title, description, imageUrl, tags, projectUrl, githubUrl } = req.body;
    try {
        const newProject = new Project({
            title,
            description,
            imageUrl,
            tags,
            projectUrl,
            githubUrl
        });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
