import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export const Publisher = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      {itemId ? (
        <div>
          <h1>publishing companies</h1>
          <ul>
            <li>
              <Link to="/Publisher/fksehgl">fksehgl</Link>
            </li>
            <li>
              <Link to="/Publisher/hfbasjh">hfbasjh</Link>
            </li>
            <li>
              <Link to="/Publisher/fdzfd">fdzfd</Link>
            </li>
          </ul>
        </div>
      ) : (
        <p>page item notfound</p>
      )}
      <button onClick={() => navigate("/")}>go to book list</button>
    </>
  );
};
