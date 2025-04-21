// fetch and display book list
import React, { useState, useEffect } from "react";
import "./GetBooks.css";

export default function GetBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/books");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();

    const interval = setInterval(fetchBooks, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/delete-book/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Book deleted");
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      })
      .catch((err) => console.error("Error deleting book:", err));
  };

  return (
    <>
      <div className="background"></div>
      <div className="woolf"></div>

      <div className="content-container">
        <div className="content">
          <h2 className="book_list_h1">Book List</h2>
          {books.length === 0 ? (
            <p>No books found</p>
          ) : (
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <strong>{book.title}</strong> by {book.author}{" "}
                  <button onClick={() => handleDelete(book.id)}>X</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
