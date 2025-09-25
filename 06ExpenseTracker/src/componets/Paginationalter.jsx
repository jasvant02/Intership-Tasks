import { useEffect } from "react";
import { useState } from "react";
// import { useDebounce } from "usedebounce";
import { useLocalStorage } from "../../../05Pagination/src/componets/useLocalStorage";
import { useDebounce } from "../../../05Pagination/src/usedebounce";
// import { Converts } from "../componets/Converts";

export const Paginationalter = () => {
  const [apidata, setApidata] = useState([]); //for fetching api state
  const [load, setLoad] = useState(true);

  const [totalpage, setTotalpage] = useState(0); //pagination
  const [search, setSearch] = useLocalStorage("search", ""); //Searching
  const [sort, setSort] = useState("none"); //Sorting
  // const [form, setForm] = useState(true); //form based changes..
  // const [edit, setEdit] = useState({ id: "", title: "", price: "" });
  const seachterm = useDebounce(search, 1000);

  //   const getPageUrl = () => {
  //     const param = new URLSearchParams(window.location.search);
  //     return parseInt(param.get("page") || 1);
  //   };
  const [page, setpage] = useLocalStorage("page", 1);

  const DOTS = "...";
  // const totalpage = Math.ceil(data.total / 10);
  // console.log(totalpage);
  const fetchApii = async (skipp = 0, Searching = "") => {
    // setLoad(true);
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
  // useEffect(() => {}, []);

  useEffect(() => {
    const skipp = (page - 1) * 10;
    fetchApii(skipp, seachterm);

    // const handleUrl = () => {
    //   setpage(getPageUrl());
    // };
    // window.addEventListener("popstate", handleUrl);
    // return () => window.removeEventListener("popstate", handleUrlChange);
  }, [page, seachterm]);

  // console.log(apidata);

  const handlebyprice = () => {
    if (sort === "none" || sort === "desc") {
      setSort("asc");
    } else {
      setSort("desc");
    }
  };
  const sorted = apidata?.products
    ? [...apidata.products].sort((a, b) => {
        if (sort === "asc") {
          return a.price - b.price;
        }
        if (sort === "desc") {
          return b.price - a.price;
        }
        return 0;
      })
    : [];

  const handleSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    handleCallNew(1, newSearch);
    // setpage(1);
    // fetchApii(0, newSearch);
  };

  const handleCallNew = (newpage) => {
    if (newpage >= 1 && newpage <= totalpage) {
      setpage(newpage);
      // const params = new URLSearchParams();
      // params.set("page", newpage);

      // window.history.replaceState(null, "", `?${params}`);
    }
  };

  const getPagination = () => {
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

  // const handledelete = (id) => {
  //   const filterid = apidata.products.filter((e) => e.id !== id);

  //   // const spliced = apidata.products.map((e) => {
  //   //   return apidata.products.id.splice(10, 1);
  //   // });

  //   setApidata({
  //     ...apidata,
  //     products: filterid,

  //     // raj: {
  //     //   ...apidata,
  //     //   limit: "jas",
  //     //   products: [...filterid, { title: "heloo" }],
  //     // },
  //     // mahesh: { ...apidata, one: [...filterid, { title: "ram" }, { id: 8 }] },
  //   });
  // };

  // const handleform = () => {
  //   setForm(true);
  // };

  // const handlEdit = (item) => {
  //   setEdit(item);
  //   setForm(true);
  // };

  // const handleForm = (e) => {
  //   setEdit({
  //     ...edit,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleIdChange = (e) => {
  //   const id = parseInt(e.target.value);

  //   // setEdit({ ...edit, id: id });

  //   const foundItem = apidata.products.find((item) => item.id === id);
  //   if (foundItem) {
  //     setEdit(foundItem);
  //   } else {
  //     setEdit({ ...edit, id: id, title: "", price: "" });
  //   }
  // };
  // const handleupdate = (e) => {
  //   e.preventDefault();

  //   const updateitem = apidata.products.map((item) =>
  //     item.id === edit.id ? edit : item
  //   );
  //   // const form = {
  //   //   id: "232",
  //   //   price: "3541",
  //   //   title: "jcvgjk",
  //   // };

  //   // const updatepro = [...apidata.products, update];

  //   setApidata({
  //     ...apidata,
  //     products: updateitem,
  //   });
  //   setForm(false);
  //   setEdit({ id: "", title: "", price: "" });
  // };

  const paginationRange = getPagination();
  return (
    <>
      <h1>Pagination </h1>
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
      <button
        onClick={() => {
          handleCallNew(page - 1);
        }}
        disabled={page == 1}
      >
        previous
      </button>
      {/* {Array.from({ length: totalpage }, (_, i) => (
        <button key={i + 1} onClick={() => handleCallNew(i + 1)}>
          {i + 1}
        </button>
      ))} */}

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
        onClick={() => {
          handleCallNew(page + 1);
        }}
        disabled={page == totalpage}
      >
        Next
      </button>
      {/* <button onClick={handledelete}>delt</button>

      <button onClick={handleupdate}>update</button> */}
      <hr />
      {/* {form && (
        <div>
          <form onSubmit={handleupdate}>
            <input
              type="number"
              placeholder="id"
              value={edit.id}
              onChange={handleIdChange}
            />
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              value={edit.title}
              onChange={handleForm}
            />
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={edit.price}
              onChange={handleForm}
            />
            <button>Update</button>
          </form>
        </div>
      )} */}
      <Paginationalter />

      {/* <Converts /> */}
    </>
  );
};

// export default App;
