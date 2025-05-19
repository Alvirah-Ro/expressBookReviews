const express = require("express");
const mongoose = require('mongoose');
const Book = require('./models/book.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


/// Get the book list available in the shop
public_users.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Database error when fetching list of all books" });
  }
});


// Get book details based on id
public_users.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findOne({ id: id.toString() });

    if (book) {
      return res.json(book);
    } else {
      return res.status(404).json({ message: "book not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Database error when fetching books by id" });
  }
});


// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const books = await Book.find({ title });

    if (books.length > 0) {
      return res.json(books);
    } else {
      return res.status(404).json({ message: "book title not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Database error when fetching books by title" });
  }
});


// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  try {
    const author = (req.params.author);
    const books = await Book.find({ author });

    if (books.length > 0) {
      return res.json(books);
    } else {
      return res.status(404).json({ message: "author not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Database error when fetching books by author" })
  }
});


//  Get book review
public_users.get("/review/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findOne({ id: id.toString() });

    if (book) {
      return res.json(book.reviews);
    } else {
      return res.status(404).json({ message: "Reviews not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Database error when fetching reviews by book id" });
  }
});


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

module.exports = { general: public_users };
