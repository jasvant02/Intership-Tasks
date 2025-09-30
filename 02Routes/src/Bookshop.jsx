import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export const Bookshop = () => {
  const navigate = useNavigate();
  const { bookshopId } = useParams();

  console.log("bookshopId", bookshopId);
  return <>Bookshop-{bookshopId}</>;
};
