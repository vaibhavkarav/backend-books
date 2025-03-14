const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: String,
      required: true,
    },
    genre: [
      {
        type: String,
        enum: [
          "Fiction",
          "Mystery",
          "Thriller",
          "Science Fiction",
          "Fantasy",
          "Romance",
          "Historical",
          "Biography",
          "Self-help",
          "Business",
          "Autobiography",
          "Non-fiction",
          "Other",
        ],
      },
    ],
    language: { type: String, required: true },
    country: {
      type: String,
      default: "United States",
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    summary: String,
    coverImageUrl: String,
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
