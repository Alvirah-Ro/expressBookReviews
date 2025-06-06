const mongoose = require('mongoose');
const Book = require('./models/book');

mongoose.connect("mongodb://127.0.0.1:27017/bookshop",);

const seedBooks = [
  {
    id: 1,
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    reviews: {}
  },
  {
    id: 2,
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    reviews: {}
  },
  {
    id: 3,
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    reviews: {}
  },
  { 
    id: 4, 
    author: "Unknown",
    title: "The Epic Of Gilgamesh",
    reviews: {}
  },
  { 
    id: 5,
    author: "Unknown",
    title: "The Book Of Job",
    reviews: {}
  },
  {
    id: 6,
    author: "Unknown",
    title: "One Thousand and One Nights",
    reviews: {},
  },
  { 
    id: 7,
    author: "Unknown",
    title: "Njál's Saga",
    reviews: {}
  },
  { 
    id: 8,
    author: "Jane Austen",
    title: "Pride and Prejudice",
    reviews: {}
  },
  { 
    id: 9,
    author: "Honoré de Balzac",
    title: "Le Père Goriot",
    reviews: {}
  },
  {
    id: 10,
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    reviews: {},
  },
];

Book.insertMany(seedBooks)
  .then(() => {
    console.log("Books seeded successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  });
