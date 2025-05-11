const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const upload = require('../middleware/uploadMiddleware'); // Multer middleware

router.patch(
  '/update-profile/:id',
  upload.single('image'), // Multer handles file upload
  async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User na paoa gese' });

      if (req.body.fullName) user.fullName = req.body.fullName;
      if (req.body.email) user.email = req.body.email;

      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        user.password = hashedPassword;
      }
      console.log('image', req.file);
      if (req.file) {
        user.photoURL = `${req.protocol}://${req.get('host')}/uploads/${
          req.file.filename
        }`;
      }

      await user.save();
      res.status(200).json({ message: 'User updated', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
