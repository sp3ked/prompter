const express = require('express');
const router = express.Router();
const Prompt = require('./prompt');

// Create a new prompt
router.post('/prompts', async (req, res) => {
    try {
        const newPrompt = new Prompt({
            title: req.body.title,
            content: req.body.content
        });
        const savedPrompt = await newPrompt.save();
        res.status(201).json(savedPrompt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all prompts
router.get('/prompts', async (req, res) => {
    try {
        const prompts = await Prompt.find();
        res.json(prompts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific prompt by ID
router.get('/prompts/:id', async (req, res) => {
    try {
        const prompt = await Prompt.findById(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
        res.json(prompt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a prompt
router.delete('/prompts/:id', async (req, res) => {
    try {
        const prompt = await Prompt.findByIdAndDelete(req.params.id);
        if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
        res.json({ message: 'Prompt deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
