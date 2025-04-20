// fetch and display book list
import React, { useState, useEffect } from "react";

export default function GetBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:" + err));
  }, []);

  return (
    <>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
