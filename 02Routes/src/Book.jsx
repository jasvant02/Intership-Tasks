import React from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import books from "./bookData.js";

export const Book = () => {
  const navigate = useNavigate();
  // const bookNo = ["Book-1", "Book-2", "Book-3", "Book-4"];

  return (
    <>
      {books.map((book) => (
        <div key={book.id}>
          <ul>
            <li>
              <Link to={`newBook/${book.id}`}>{book.title}</Link>
            </li>
          </ul>
        </div>
      ))}
      <button onClick={() => navigate("/bookshop/:bookshopId")}>
        See book shops
      </button>
      <button onClick={() => navigate("/searchResults")}>See Publishers</button>
      {/* <Outlet /> */}
    </>
  );
};

export default Book;
