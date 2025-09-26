import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export const Bookshop = () => {
  const navigate = useNavigate();
  const { bookshopId } = useParams();

  return (
    <>
      <h1>Book shop list</h1>
      {bookshopId ? (
        <div>
          <ul>
            <li>
              <Link to="/bookshop/fksehgl">fksehgl</Link>
            </li>
            <li>
              <Link to="/bookshop/gsd">gsd</Link>
            </li>
            <li>
              <Link to="/bookshop/ghshdg">ghshdg</Link>
            </li>
          </ul>
        </div>
      ) : (
        <p>page item notfound</p>
      )}
      <button onClick={() => navigate("/")}>go to bool list</button>
    </>
  );
};
