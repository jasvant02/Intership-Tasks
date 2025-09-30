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
        <Route path="/bookshop/:bookshopId" element={<Bookshop />}></Route>
        <Route path="/searchResults" element={<Publisher />} />
        <Route path="/searchResults/:searchTerm" element={<Publisher />} />
        <Route path="newBook/:bookId" element={<FavBooks />}></Route>
        <Route path="/searchResults" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
