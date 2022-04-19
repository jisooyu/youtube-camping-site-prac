const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// register
const register = asyncHandler(async (req, res) => {
  // postman이나 React에서 보내준 user data를 받음
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  // db에서 email로 user 찾아서 동일 user가 있다면 거부, 아니면 새로운 user생성
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // db에 저장할 user document 생성
    user = new User({
      name,
      email,
      password,
    });

    // 여기서 부터는 token 관련 코드
    // Hash password & generate token
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.token = await generateToken(user._id);

    // db에 user 정보 저장
    await user.save();
    // response로 결과 보내줌
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: user.token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // generate token
    user.token = generateToken(user._id);
    res.status(200).json({
      id: user._id,
      email: user.email,
      token: user.token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(401).send('invalid credentials');
  }
});

// desc    Get current user
// route   /api/users/me
// access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

// token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  register,
  login,
  getMe,
};
