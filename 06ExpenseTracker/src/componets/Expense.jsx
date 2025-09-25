// src/App.js
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from "./usedebounce";

const App = () => {
  const [apidata, setApidata] = useState([]);
  const [load, setLoad] = useState(true);
  const [totalpage, setTotalpage] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const seachterm = useDebounce(search, 1000);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") || 1);

  const DOTS = "...";

  const fetchApii = async (skipp = 0, Searching = "") => {
    let api = `https://dummyjson.com/products?limit=10&skip=${skipp}&select=title,price`;
    if (Searching !== "") {
      api = `https://dummyjson.com/products/search?q=${Searching}&limit=10&skip=${skipp}&select=title,price`;
    }

    try {
      const response = await fetch(api);
      const data = await response.json();
      setApidata(data);
      const totalpages = Math.ceil(data.total / data.limit);
      setTotalpage(Math.min(totalpages, 20));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    const skipp = (page - 1) * 10;
    fetchApii(skipp, seachterm);
  }, [page, seachterm]);

  const handlebyprice = () => {
    if (sort === "none" || sort === "desc") {
      setSort("asc");
    } else {
      setSort("desc");
    }
  };
  const sorted = apidata?.products
    ? [...apidata.products].sort((a, b) => {
        if (sort === "asc") return a.price - b.price;
        if (sort === "desc") return b.price - a.price;
        return 0;
      })
    : [];

  const handleSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    handleCallNew(1, newSearch);
  };

  const handleCallNew = (newpage, searchTerm = seachterm) => {
    if (newpage >= 1 && newpage <= totalpage) {
      const newSearchParams = new URLSearchParams();

      if (newpage > 1) {
        newSearchParams.set("page", newpage);
      }
      if (searchTerm) {
        newSearchParams.set("q", searchTerm);
      }

      const newQueryString = newSearchParams.toString();
      const newUrl = `/?${newQueryString}`.replace(/\?$/, "");

      navigate(newUrl, { replace: true });
    }
  };

  const getPagination = () => {
    // ... (Your pagination logic remains the same)
    const range = [];

    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalpage - 1, page + 1);

    range.push(1);

    if (startPage > 2) range.push(DOTS);

    for (let i = startPage; i <= endPage; i++) range.push(i);

    if (endPage < totalpage - 1) range.push(DOTS);

    if (!range.includes(totalpage)) range.push(totalpage);

    return range;
  };

  if (load) {
    return <p>Loading...</p>;
  }

  const paginationRange = getPagination();

  return (
    <>
      <h1>Pagination </h1>
      {/* ... (Your JSX remains the same) */}
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={handlebyprice}>
              Price
              {sort === "asc" && " ↑"}
              {sort === "desc" && " ↓"}
            </th>
            <th>Title</th>
            <th>manage</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {sorted?.map((items) => (
            <tr key={items.id}>
              <td>{items.id}</td>
              <td>{items.price}</td>
              <td>{items.title}</td>
              <td>
                {/* <button onClick={() => handledelete(items.id)}>del</button> */}
              </td>
              <td>
                {/* <button onClick={() => handlEdit(items)}>Edit</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleCallNew(page - 1)} disabled={page === 1}>
        previous
      </button>
      {paginationRange.map((item, index) =>
        item === DOTS ? (
          <span key={index}>{DOTS}</span>
        ) : (
          <button
            key={index}
            onClick={() => handleCallNew(item)}
            className={item === page ? "active" : ""}
          >
            {item}
          </button>
        )
      )}
      <button
        onClick={() => handleCallNew(page + 1)}
        disabled={page === totalpage}
      >
        Next
      </button>
      <hr />
    </>
  );
};

export default App;
