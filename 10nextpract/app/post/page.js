import React from "react";
import Link from "next/link";
import Counter from "./Counter";

export default async function Postpage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const post = await res.json();
  console.log(post);
  return (
    <div>
      <h1>post page</h1>
      <ul>
        {post.slice(0, 5).map((posts) => (
          <li key={posts.id}>
            <Link href={`/post/${posts.id}`}>{posts.title}</Link>
          </li>
        ))}
      </ul>
      <Counter />
    </div>
  );
}
