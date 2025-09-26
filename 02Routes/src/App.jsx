import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Book } from "./Book";
import { Bookshop } from "./Bookshop";
import { Publisher } from "./Publisher";
import { FavBooks } from "./FavBook";

function App() {
  return (
    <>
      <h1>Home</h1>

      <Routes>
        <Route path="/" element={<Book />}></Route>
        <Route path="/bookshop/:bookshopId" element={<Bookshop />}></Route>
        <Route path="/publisher/:itemId" element={<Publisher />}></Route>
        <Route path="?newBook/:bookId" element={<FavBooks />}></Route>
      </Routes>
    </>
  );
}

export default App;
