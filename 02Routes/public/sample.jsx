import { useParams, useNavigate, useLocation } from "react-router-dom";
import books from "./bookData";

export const FavBooks = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentBookIndex = books.findIndex((book) => book.id === bookId);
  const newFavBook = books[currentBookIndex];

  if (!newFavBook) {
    return (
      <main>
        <h1>Book not found!</h1>
        <p>The requested book with ID "{bookId}" does not exist.</p>
        <button onClick={() => navigate("/")}>Go back to book list</button>
      </main>
    );
  }

  const handleNextClick = () => {
    const nextIndex = (currentBookIndex + 1) % books.length;
    const nextBookId = books[nextIndex].id;
    navigate(`/newBook/${nextBookId}`);
  };

  return (
    <main>
      <h1>Favorite Book</h1>
      <p>{`Title: ${newFavBook.title}`}</p>
      <p>{`By: ${newFavBook.author}`}</p>
      <p>{`Year: ${newFavBook.year}`}</p>
      <p>{`Description: ${newFavBook.description}`}</p>
      <p>pathname: {location.pathname}</p>

      {books.length > 1 && <button onClick={handleNextClick}>Next</button>}
    </main>
  );
};
