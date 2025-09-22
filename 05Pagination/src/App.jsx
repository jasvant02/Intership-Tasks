import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [apidata, setApidata] = useState([]);
  const [load, setLoad] = useState(true);
  const [page, setpage] = useState(1);
  const [totalpage, setTotalpage] = useState(0);

  const DOTS = "...";
  // const totalpage = Math.ceil(data.total / 10);
  // console.log(totalpage);

  const fetchApii = async (skipp = 0) => {
    // console.log("skipp", skipp);
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${skipp}&select=title,price`
    );
    const data = await response.json();
    setApidata(data);
    setLoad(false);
    const totalpages = Math.ceil(data.total / data.limit);
    setTotalpage(Math.min(totalpages, 20));
  };

  useEffect(() => {
    fetchApii();
  }, []);

  console.log(apidata);

  const handleCallNew = (newpage) => {
    console.log("GG");
    if (newpage >= 1 && newpage <= totalpage) {
      const skipp = (newpage - 1) * 10;
      setpage(newpage);
      fetchApii(skipp);
    }
  };

  const getPagination = () => {
    const range = [];

    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalpage - 1, page + 1);

    range.push(1);

    if (startPage > 2) {
      range.push(DOTS);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalpage - 1) {
      range.push(DOTS);
    }

    if (!range.includes(totalpage)) {
      range.push(totalpage);
    }

    return range;
  };

  const paginationRange = getPagination();
  if (load) {
    return <p>Loading...</p>;
  }
  // const handledelete = (e) => {
  //   const filterid = apidata.products.filter((e) => {
  //     return e.id != 10;
  //   });

  //   setApidata({
  //     ...apidata,
  //     raj: {
  //       ...apidata,
  //       limit: "jas",
  //       products: [...filterid, { title: "heloo" }, { title: apidata }],
  //     },
  //   });

  // };
  return (
    <>
      <h1>Pagination </h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Price</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {apidata?.products?.map((items, index) => (
            <tr key={index}>
              <td>{items.id}</td>
              <td>{items.price}</td>
              <td>{items.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          handleCallNew(page - 1);
        }}
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
      >
        Next
      </button>
      {/* <button onClick={handledelete}>delt</button> */}
    </>
  );
};

export default App;
