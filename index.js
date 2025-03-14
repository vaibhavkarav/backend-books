// config code
const express = require("express");
const app = express();
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/books.models");

// middleware code
app.use(express.json());
app.use(cors());
initializeDatabase();

// create new book
async function createBook(newBook) {
  try {
    const book = new Book(newBook);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    throw error;
  }
}

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: "Book created successfully.", book: savedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book." });
  }
});

// get code

async function readAllBooks() {
  try {
    const allBooks = await Book.find();
    return allBooks;
  } catch (error) {
    throw error;
  }
}

app.get("/books", async (req, res) => {
  try {
    const allBooks = await readAllBooks();

    if (allBooks.length !== 0) {
      res.json(allBooks);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

// get book by title
async function readBookByTitle(bookTitle) {
  try {
    const bookByTitle = await Book.findOne({ title: bookTitle });
    return bookByTitle;
  } catch (error) {
    throw error;
  }
}

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const book = await readBookByTitle(req.params.bookTitle);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

// get books by author
async function readBooksByAuthor(authorName) {
  try {
    const booksByAuthor = await Book.find({ author: authorName });
    return booksByAuthor;
  } catch (error) {
    throw error;
  }
}

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const books = await readBooksByAuthor(req.params.authorName);
    if (books.length !== 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

// get books by genre
async function readBooksByGenre(bookGenre) {
  try {
    const booksByGenre = await Book.find({ genre: bookGenre });
    return booksByGenre;
  } catch (error) {
    throw error;
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const books = await readBooksByGenre(req.params.bookGenre);

    if (books.length !== 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

// get books by releaseYear
async function readBooksByReleaseYear(releaseYear) {
  try {
    const booksByYear = await Book.find({ publishedYear: releaseYear });
    return booksByYear;
  } catch (error) {
    throw error;
  }
}

app.get("/books/year/:releaseYear", async (req, res) => {
  try {
    const books = await readBooksByReleaseYear(
      parseInt(req.params.releaseYear)
    );

    if (books.length !== 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

// update book's rating
async function updateBookRating(bookId, dataToUpdate) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updatedBook;
  } catch (error) {
    throw error;
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateBookRating(req.params.bookId, req.body);
    if (updatedBook) {
      res.status(200).json({
        message: "Book updated successfully.",
        updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book." });
  }
});

// update book by title
async function updateBookByTitle(bookTitle, dataToUpdate) {
  try {
    const updatedBookByTitle = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      { new: true }
    );
    return updatedBookByTitle;
  } catch (error) {
    throw error;
  }
}

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body);

    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully.", updatedBook });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book." });
  }
});

// delete book by id
async function deleteBook(bookId) {
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    return deletedBook;
  } catch (error) {
    throw error;
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.bookId);

    if (deletedBook) {
      res
        .status(200)
        .json({ message: "Book deleted successfully.", deletedBook });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book." });
  }
});

// server code
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
