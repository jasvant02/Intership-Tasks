import { Routes, Route } from "react-router-dom";
import Home from

function App() {
  return (
    <>
      <h1>Routes Learning</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
