const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Camp = require('../models/campModel');
const { upload } = require('./awsController');

// 새로운 camp 만들기/생성
// POST /api/camps
// Private: 로그인 필수

const createCamp = asyncHandler(async (req, res) => {
  // postman이나 React에서 보내준 camp data를 받음
  const { campName, description } = req.body;

  // image 파일은 req.file에서 받음
  const image = req.file;

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // 이미지를  AWS S3에 올림
  const result = await upload(image);

  // db에 저장할 camp document 생성
  const campData = await Camp.create({
    user: req.user.id,
    campName,
    description,
    s3ImageUrl: result.Location,
  });

  res.status(201).json(campData);
});

// db에 저장된 모든 camps를 불러오기
const getCamps = asyncHandler(async (req, res, next) => {
  // 우선 데이터를 부르려고 하는 user가 db에 있는 user인지를 확인
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // 모든 camp 정보를 불러옴
  const camps = await Camp.find();
  // 결과를 돌려줌
  res.status(200).json(camps);
});

// 사용자가 만든 특정 camp 불러오기
const getCamp = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const camp = await Camp.findById(req.params.id);

  if (!camp) {
    res.status(404);
    throw new Error('Camp not found');
  }

  if (camp.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(camp);
});

module.exports = {
  getCamps,
  getCamp,
  createCamp,
};
