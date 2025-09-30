import React from "react";
import { Route, Routes } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";
import Product from "./Product";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route exact path="/" component={FeaturedProducts} />
      <Route exact path="/product/:id" component={Product} />
    </Routes>
  );
}
export default App;
