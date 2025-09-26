import { useParams, useNavigate, useLocation } from "react-router-dom";
import books from "./bookData";
import { useEffect } from "react";

export const FavBooks = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = books.findIndex((book) => book.id === bookId);
  const newFavBook = books[currentIndex];

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 2000);
  // }, []);

  // if (!newFavBook) {
  //   return (
  //     <main>
  //       <h1>Book not found!</h1>
  //       <p>The requested book with ID "{bookId}" does not exist.</p>
  //       <button onClick={() => navigate("/")}>Go back to book list</button>
  //     </main>
  //   );
  // }

  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % books.length;
    const nextBookId = books[nextIndex].id;
    navigate(`/newBook/${nextBookId}`);
  };

  return (
    <>
      <h1>Favorite Book</h1>
      <div>
        <p>{`Title: ${newFavBook.title}`}</p>
        <p>{`By: ${newFavBook.author}`}</p>
        <p>{`Year: ${newFavBook.year}`}</p>
        <p>{`Description: ${newFavBook.description}`}</p>
        <p>pathname: {location.pathname}</p>

        {books.length > 1 && <button onClick={handleNextClick}>Next</button>}
      </div>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </>
  );
};
