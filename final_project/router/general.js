const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

//get list of books using Axios
const fetchBooks = async () => {
  try {
    const response = await axios.get('https://75mwql-5000.csb.app');
    const listOfEntries = response.data.entries;
    listOfEntries.forEach((entry) => {
      console.log(entry.Category);
    });
  } catch (error) {
    console.error('Error fetching books', error);
  }
}

module.exports = fetchBooks;

//get book by id using a promise
const fetchBookById = (id) => {
  return new Promise((resolve, reject) => {
    const book = books.find((book) => book.id === id);
    if (book) {
      resolve(book);
    } else {
      reject("book not found");
    }
  });
};

module.exports = fetchBookById;

//get books by author using a Promise
const fetchBooksByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    const booksByAuthor = books.filter((book) => book.author === author);
    if (booksByAuthor.length > 0) {
      resolve(booksByAuthor);
    } else {
      reject("book not found");
    }
  });
};

module.exports = fetchBooksByAuthor;


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

/// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/id/:id", function (req, res) {
  //const id = req.params.id;
  const id = parseInt(req.params.id, 10);
  const book = books.find((book) => book.id === id);

  if (book) {
    return res.json(book);
  } else {
    return res.status(404).json({ message: "book not found" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //const author = req.params.author;
  const author = decodeURIComponent(req.params.author);

  const filtered_books = books.filter((book) => book.author === author);

  if (filtered_books.length > 0) {
    return res.json(filtered_books);
  } else {
    return res.status(404).json({ message: "book not found" });
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const filtered_books = books.filter((book) => book.title === title);

  if (filtered_books.length > 0) {
    return res.json(filtered_books);
  } else {
    return res.status(404).json({ message: "book not found" });
  }
});

//  Get book review
public_users.get("/review/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const book = books.find((book) => book.id === id);

  if (book) {
    return res.json(book.reviews);
  } else {
    return res.status(404).json({ message: "Review not found" });
  }
});

module.exports.general = public_users;
