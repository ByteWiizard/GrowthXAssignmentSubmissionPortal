// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const auth = require('../middleware/auth');

// POST /user/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ username, password, role: 'user' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// POST /user/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const payload = { user: { id: user.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// GET /user/admins
router.get('/admins', auth('user'), async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password');
        res.json(admins);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/upload', auth('user'), upload.single('file'), async (req, res) => {
    const { task, adminId } = req.body;
    
    console.log(adminId);
    // Ensure either task or file is provided
    if (!task && !req.file) {
      return res.status(400).json({ message: 'Please provide a task or upload a file' });
    }
  
    try {
      const assignmentData = {
        userId: req.user.id,
        adminId,
        status: 'pending',
      };
  
      if (task) {
        assignmentData.task = task;
      }
  
      if (req.file) {
        assignmentData.fileUrl = req.file.path; // Save the file path
        assignmentData.fileName = req.file.originalname; // Save the original file name
      }
  
      const assignment = new Assignment(assignmentData);
      await assignment.save();
      res.json({ message: 'Assignment uploaded successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


  router.get('/assignments', auth('user'), async (req, res) => {
    try {
      const assignments = await Assignment.find({ userId: req.user.id })
        .populate('adminId', 'username')
        .sort({ createdAt: -1 });
      res.json(assignments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
