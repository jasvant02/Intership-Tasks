import React from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import books from "./bookData.js";

export const Book = () => {
  const navigate = useNavigate();
  return (
    <>
      {books &&
        books.map((book) => (
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
      <button onClick={() => navigate("/publisher/:itemId")}>
        See Publishers
      </button>
      {/* <Outlet /> */}
    </>
  );
};

export default Book;
