const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  return !users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password,
  );
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 },
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find((book) => book.id === id);

  if (book) {
    let review = req.query.review;
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
regd_users.delete("/auth/review/:isbn", (req, res) => {

}

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
