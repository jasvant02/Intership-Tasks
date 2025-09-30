import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get("search");

  return (
    <>
      <div>
        <h1>Search Results</h1>
        {searchQuery ? (
          <h2>hello ,{searchQuery} welcome to singhing</h2>
        ) : (
          <p>No search query provided.</p>
        )}
      </div>
      <button onClick={() => navigate(-1)}>Go back to publisher list</button>
    </>
  );
};
