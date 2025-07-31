const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Book = require('../models/book'); // adjust path if needed
const regd_users = express.Router();
const authMiddleware = require("../middleware/auth.js")


// Add a book review
regd_users.put("/auth/review/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find((book) => book.id === id);

  if (book) {
    let review = req.body.review;
    if (!review) {
      return res.status(400).json({ message: "Review content is required" });
    }
    book.reviews.push(review);
    return res.json({
      message: `Your review for book {id=${id}} has been added or updated`,
    });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});


//delete a book review
regd_users.delete("/auth/review/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find((book) => book.id === id);

  if (book) {
    const reviewToDelete = req.query.review; // Get the review to delete from the query parameters

    if (!reviewToDelete) {
      return res.status(400).json({ message: "Review content is required" });
    }

    const reviewIndex = book.reviews.findIndex(
      (review) => review === reviewToDelete,
    );

    if (reviewIndex !== -1) {
      book.reviews.splice(reviewIndex, 1); // Remove the review
      return res.json({
        message: `Your review for book id=${id} has been deleted`,
      });
    } else {
      return res.status(404).json({ message: "Review not found" });
    }
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
