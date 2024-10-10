
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const auth = require('../middleware/auth');


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let admin = await User.findOne({ username });
        if (admin) return res.status(400).json({ message: 'Admin already exists' });

        admin = new User({ username, password, role: 'admin' });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        await admin.save();

        const payload = { user: { id: admin.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let admin = await User.findOne({ username });
        if (!admin || admin.role !== 'admin') return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const payload = { user: { id: admin.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/assignments', auth('admin'), async (req, res) => {
    try {
        const assignments = await Assignment.find({ adminId: req.user.id })
            .populate('userId', 'username')
            .sort({ createdAt: -1 });
        res.json(assignments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/assignments/:id/accept', auth('admin'), async (req, res) => {
    try {
        let assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        if (assignment.adminId.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

        assignment.status = 'accepted';
        await assignment.save();

        res.json({ message: 'Assignment accepted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/assignments/:id/reject', auth('admin'), async (req, res) => {
    try {
        let assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        if (assignment.adminId.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

        assignment.status = 'rejected';
        await assignment.save();

        res.json({ message: 'Assignment rejected' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
