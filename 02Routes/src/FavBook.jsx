import { useParams, useNavigate, useLocation } from "react-router-dom";
import books from "./bookData";
import { useEffect } from "react";

export const FavBooks = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = books.findIndex((book) => book.id === bookId);
  const newFavBook = books[currentIndex];

  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % books.length;
    const nextBookId = books[nextIndex].id;
    navigate(`/newBook/${nextBookId}`);
  };

  return (
    <>
      <h1>Favorite Book</h1>
      <h3>{bookId}</h3>
      <div>
        <p>{`Title: ${newFavBook.title}`}</p>
        <p>{`By: ${newFavBook.author}`}</p>
        <p>{`Year: ${newFavBook.year}`}</p>
        <p>{`Description: ${newFavBook.description}`}</p>
        <p>pathname: {location.pathname}</p>
        {/* <p>title:dgnh</p> */}

        {books.length > 1 && <button onClick={handleNextClick}>Next</button>}
      </div>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </>
  );
};
