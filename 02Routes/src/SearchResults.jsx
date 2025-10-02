import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const SearchResults = () => {
  const { search } = useParams();
  const navigate = useNavigate();

  // const filteredItems = allItems.filter((item) => item.includes(search));

  return (
    <div>
      <h2>Avalaible Publishers are : {search}</h2>

      <button onClick={() => navigate(-1)}>return</button>
    </div>
  );
};
