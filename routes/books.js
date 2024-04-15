const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/*
  Routes : /
  Method : GET
  Description : Getting the books data
  Access : Public
  Parameters : None

  */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Got All the books data",
    data: books,
  });
});

/*
  Routes : /books/issued
  Method : GET
  Description : Getting the books their id
  Access : Public
  Parameters : None

  */

router.get("/issued", (req, res) => {
  const userWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBook = [];
  userWithTheIssuedBook.forEach((each) => {
    const book = books.find((eachItem) => eachItem.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedData;
    book.returnDate = each.returnData;
    issuedBook.push(book);
  });
  if (issuedBook.length === 0) {
    return res.status(404).json({
      success: false,
      msg: "No issued book data",
    });
  }
  return res.status(200).json({
    success: true,
    mag: "issued book is identified",
    data: issuedBook,
  });
});

/*
  Routes : /books/:id
  Method : GET
  Description : Get All the issued book
  Access : Public
  Parameters : id

  */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      msg: "Book not found",
    });
  }
  return res.status(201).json({
    success: true,
    msg: "Book is found",
    data: book,
  });
});

module.exports = router;
