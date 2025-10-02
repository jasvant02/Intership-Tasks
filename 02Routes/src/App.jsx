import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Book } from "./Book";
import { Bookshop } from "./Bookshop";
import { Publisher } from "./Publisher";
import { FavBooks } from "./FavBook";
import { SearchResults } from "./SearchResults";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Book />}></Route>
        <Route path="/bookshop/" element={<Bookshop />}></Route>
        <Route path="/publisher" element={<Publisher />}></Route>
        <Route path="newBook/:bookId" element={<FavBooks />}></Route>
        <Route path="/Available/:search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
