const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  getCamps,
  getCamp,
  createCamp,
} = require('../controllers/campController');

const { protect } = require('../middleware/authMiddleware');

// multer middleware
const upload = multer({ dest: 'uploads/' });

// router.route
router
  .route('/')
  .get(protect, getCamps)
  .post(protect, upload.single('imageFile'), createCamp);

router.route('/:id').get(protect, getCamp);

module.exports = router;
