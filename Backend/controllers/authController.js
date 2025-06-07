const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { fullName, email, password, role = 'Customer' } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ fullName, email, password: hashedPassword, role });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email does not match' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Password does not match' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        image: user.image,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.upDateUser = async (req, res) => {
  const { fullName, email } = req.body;
  try {
    const userId = req.user.id;

    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        image: updatedUser.image,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.log('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Current password is incorrect' });

    // Update password
    user.password = await bcrypt.hash(newPassword, 8);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// image uploade
exports.upDateUserImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { image } = req.body;
    console.log(image, userId);
    if (!image) return res.status(400).json({ message: 'No image provided' });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    res.json({
      message: 'Image updated successfully',
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        image: updatedUser.image,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.log('Image update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
