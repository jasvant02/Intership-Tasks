import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

export const Publisher = () => {
  const { itemId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const allItems = ["abc", "def", "ghi", "jkl", "mno"];

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const [filteredItems, setFilteredItems] = useState(allItems);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredItems(allItems);
    } else {
      const filter = allItems.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filter);
    }
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
    // navigate(`/search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <div>
        <h1>Publishing Companies</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <h2>Searchable List</h2>

        {filteredItems.length > 0 ? (
          <ul>
            {filteredItems.map((item) => (
              <li key={item}>
                <Link
                  to={`/publisher/${encodeURIComponent(
                    item
                  )}?search${encodeURIComponent(searchQuery)}`}
                >
                  {item}
                </Link>
              </li>
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
