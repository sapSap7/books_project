/*
requirements:
- HTTP requests such as GET (let the frontend fetch the book), POST (add a book), DELETE (delete a book by id - /books/:id)
- use the HTTP module to create a server
- store book data in a JSON file
- use the fs module to read and write the JSON file
*/

const http = require("http");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // uuid module is used to generate unique ids for the books
const filePath = "./books.json"; // path to json file
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/books") {
    const books = loadBooks();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
    return;
  }

  if (req.method === "POST" && req.url === "/add-book") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const { title, author } = JSON.parse(body);
        if (!title || !author) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Missing title or author" }));
          return;
        }

        const books = loadBooks();
        const newBook = { id: uuidv4(), title, author };
        books.push(newBook);
        saveBooks(books);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Book added", book: newBook }));
        return;
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON or server error" }));
      }
    });
    return;
  }

  if (req.method === "DELETE" && req.url.startsWith("/delete-book/")) {
    const id = req.url.split("/")[2]; // to extract id from the route /books/:id
    let books = loadBooks();
    const initialLength = books.length;
    books = books.filter((books) => books.id !== id);

    if (books.length === initialLength) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Book not found" }));
      return;
    } else {
      saveBooks(books);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book deleted" }));
      return;
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
    return;
  }
});

const loadBooks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveBooks = (books) => {
  const dataJSON = JSON.stringify(books);
  fs.writeFileSync(filePath, dataJSON);
};

server.listen(PORT, (error) => {
  if (error) {
    return console.error(error);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
