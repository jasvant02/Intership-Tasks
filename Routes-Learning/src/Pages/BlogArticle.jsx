import React from "react";
import { Link, useParams } from "react-router-dom";

export const BlogArticle = () => {
  const { blogId } = useParams();
  return (
    <>
      <h1>Blog</h1>
      <p>Blog ID:{blogId}</p>
    </>
  );
};
