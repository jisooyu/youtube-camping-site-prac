const mongoose = require('mongoose');
const campSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    campName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    s3ImageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Camp', campSchema);
