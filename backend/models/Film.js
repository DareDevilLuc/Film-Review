const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: String,
  releaseYear: Number,
  synopsis: String,
}, { timestamps: true })

module.exports = mongoose.model('Film', filmSchema)
