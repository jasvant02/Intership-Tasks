import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publisher = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  // const allItems = ["abc", "def", "ghi", "jkl", "mno"];

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/Available/${search}`);
  };

  return (
    <>
      <div>
        <h1>Publishing Companies </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Publishers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {/* {allItems && (
          <ul>
            {allItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )} */}
      </div>

      <button onClick={() => navigate("/")}>Return</button>
    </>
  );
};
