/*
this component will be the form to **add** a book 
every time a book is added, it will be added to the json file
*/

import React, { useState } from "react";
import "./PostBooks.css";

export default function PostBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add book");
      }

      const data = await response.json();
      alert("Book added");
      setTitle("");
      setAuthor("");
    } catch (err) {
      console.error("Error adding book:", err.message);
      alert("Error: " + err.message);
    }
  }

  return (
    <>
      <form className="inputs" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Insert Book Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Insert Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Add to Library</button>
      </form>
    </>
  );
}
