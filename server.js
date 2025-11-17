const express = require("express");
const app = express();

app.use(express.json()); // To read JSON body

// In-memory books array
let books = [
  { id: 1, title: "Book One", author: "Author A" },
  { id: 2, title: "Book Two", author: "Author B" }
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update a book by ID
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title;
  book.author = author;

  res.json(book);
});

// DELETE a book by ID
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  books = books.filter(b => b.id !== id);

  res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
