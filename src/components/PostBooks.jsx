/*
this component will be the form to **add** a book 
every time a book is added, it will be added to the json file
*/

import React, { useState } from "react";

export default function PostBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Book added");
        setTitle("");
        setAuthor("");
      })
      .catch((err) => console.error("Error adding book:" + err));
  }

  return (
    <>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add</button>
      </form>
    </>
  );
}
