import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Product = ({ match }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = () => {
    axios
      .get(
        `https://shoppingapiacme.herokuapp.com/shopping/?id=${match.params.id}`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {data.map((item) => {
        return (
          <div className="product-container" key={item.id}>
            <div>
              <img className="prod-image" src={item.image} alt="" />
            </div>
            <div>
              <h1 className="brand">{item.brand}</h1>
              <h2>{item.item}</h2>
              <p>{item.description}</p>
              <p>
                <strong>Price:</strong> {item.price}
              </p>
              <p>
                <strong>Color:</strong> {item.color}
              </p>
            </div>
          </div>
        );
      })}
      <div className="back">
        <Link to="/">FEATURED PRODUCTS</Link>
      </div>
    </div>
  );
};
export default Product;
