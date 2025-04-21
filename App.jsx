/*
requirements: 
- create a form to add a book (book title, author name)
- present a list w the books saved in the json file
- add a button to delete a book
- use fetch to send a POST request to the server
*/
import React from "react";
import GetBooks from "./components/GetBooks";
import PostBooks from "./components/PostBooks";
import DeleteBook from "./components/DeleteBook";

export default function App() {
  return (
    <>
      <h1>Welcome to the Virtual Library</h1>
      <PostBooks />
      <DeleteBook />
      <GetBooks />
    </>
  );
}
