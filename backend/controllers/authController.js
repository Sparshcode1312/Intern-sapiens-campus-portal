const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const allowedCampuses = [
  'RIET',
  'SHS Dhawas',
  'SGS Bharatpur',
  'SJS Gandhipath',
  'SJS Hawa Sadak',
];

const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

// @desc    Register a new Centre Head
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const centreName = req.body.centreName?.trim();

    if (!name || !email || !password || !centreName) {
      return res.status(400).json({
        message:
          'Name, email, password and campus are required.',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message:
          'Password must contain at least 8 characters.',
      });
    }

    if (!allowedCampuses.includes(centreName)) {
      return res.status(400).json({
        message: 'Please select a valid campus.',
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const role = 'Centre Head';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      centreName,
      designationLabel: `${role} - ${centreName}`,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      centreName: user.centreName,
      designationLabel: user.designationLabel,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error('Registration error:', error);

    return res.status(500).json({
      message: 'Unable to create the account.',
    });
  }
};

// @desc    Authenticate user and return token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      centreName: user.centreName,
      designationLabel: user.designationLabel,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      message: 'Server error',
    });
  }
};

// @desc    Get currently logged-in user
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      centreName: user.centreName,
      designationLabel: user.designationLabel,
    });
  } catch (error) {
    console.error('Current user error:', error);

    return res.status(500).json({
      message: 'Server error',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
