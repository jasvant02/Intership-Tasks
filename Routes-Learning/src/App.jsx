import React from "react";
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
import HomePage from "./Pages/Home";
import AboutPage from "./Pages/About";

import { NavBar } from "./componet/NavBar";
import { ContactPage } from "./Pages/Contact";
import { Protect } from "./Protect";
import { BlogArticle } from "./Pages/BlogArticle";
const Company = () => <h2>Company Page</h2>;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>404:Page Not Found</h1>

      <button onClick={() => navigate("/home")}>Go to home page</button>
    </>
  );
};

// const BlogArticle = () => {
//   const { blogId } = useParams();
//   return (
//     <>
//       <h1>Blog</h1>
//       <p>Blog ID:{blogId}</p>
//       <nav>
//         <Link to="/blog/1">Blog-1</Link>
//       </nav>
//     </>
//   );
// };

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />}>
          <Route path="company" element={<Company />} />
        </Route>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/blog/:blogId" element={<BlogArticle />}></Route>
      </Routes>
      <hr />
      <Protect />
    </>
  );
}

export default App;
