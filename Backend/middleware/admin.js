const User = require('../models/User');

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: ' User not found' });
    }
    if (user?.role !== 'Admin')
      return res.status(403).json({ message: 'Forbidden' });
    req.customer = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = admin;
