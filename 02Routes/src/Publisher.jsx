import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchResults } from "./SearchResults";

export const Publisher = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();

  const allItems = ["abc", "def", "ghi", "jkl", "mno"];
  const [searchQuery, setSearchQuery] = useState(searchTerm || "");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const encoded = encodeURIComponent(searchQuery.trim());
    if (searchQuery.trim() === "") {
      navigate(`/searchResults`, { replace: true });
    } else if (encoded !== searchTerm) {
      navigate(`/searchResults/${encoded}`, { replace: true });
    }
  }, [searchQuery]);

  useEffect(() => {
    const query = searchTerm || "";
    setSearchQuery(query);

    const filtered = allItems.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm]);

  return (
    <>
      <div>
        <h1>Publishing Companies</h1>
        <input
          type="text"
          placeholder="input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {filteredItems.length > 0 ? (
          <ul>
            {filteredItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No results found for "{searchQuery}".</p>
        )}
      </div>

      <button onClick={() => navigate("/")}>Go to book list</button>
    </>
  );
};
