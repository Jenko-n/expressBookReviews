const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let doesExist = require("./auth_users.js").doesExist;


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }

  return res.status(404).json({ message: "Username or passwor missing" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const authorName = req.params.author;
  const matchingBooks = [];
  const bookKeys = Object.keys(books);

  bookKeys.forEach((key) => {
    const book = books[key];

    if (book.author === authorName) {
      matchingBooks.push(book);
    }
  });

  if (matchingBooks.length > 0) {
    res.send(matchingBooks);
  }
  else {
    res.send("No books found!")
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const bookTitle = req.params.title;
  const matchingBooks = [];
  const bookKeys = Object.keys(books);

  bookKeys.forEach((key) => {
    const book = books[key];

    if (book.title === bookTitle) {
      matchingBooks.push(book);
    }
  });

  if (matchingBooks.length > 0) {
    res.send(matchingBooks);
  }
  else {
    res.send("No books found!")
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    const reviews = books[isbn].reviews;
    res.send(reviews);
  }
});

module.exports.general = public_users;
