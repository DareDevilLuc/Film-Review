const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 10 },
  comment: String,
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)
