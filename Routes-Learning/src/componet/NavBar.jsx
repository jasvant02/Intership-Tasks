import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <Link to="/blog/1">Blog 1</Link> | <Link to="/blog/2">Blog 2</Link>
        </ul>
      </nav>
    </>
  );
};
