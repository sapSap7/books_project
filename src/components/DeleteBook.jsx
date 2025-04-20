import React, { useState } from "react";

export default function DeleteBook() {
  const [id, setId] = useState("");

  function handleDelete() {
    if (!id) return;

    fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Deleted");
        setId("");
      })
      .catch((err) => console.error("Error deleting book:" + err));
  }

  return (
    <>
      <h3>Delete Book</h3>
      <input
        placeholder="Enter book ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
