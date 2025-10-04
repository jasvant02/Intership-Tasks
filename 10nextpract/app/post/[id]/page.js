import React from "react";
import Commentbox from "./Commentbox";

export default async function Postdetaile({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch API");
  }
  const post = await res.json();

  const commentres = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"
    }/api/comments?postId=${params.id}`,
    { cache: "no-store" }
  );
  const comments = await commentres.json();

  return (
    <div>
      <h1>Post Detail Page</h1>
      <h2>Title: {post.title}</h2>
      <p>{post.body}</p>

      <hr />
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              <small>{c.createdAt}</small>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      <Commentbox postId={params.id} />
    </div>
  );
}
