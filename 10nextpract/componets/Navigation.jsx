import React from "react";
import Link from "next/link";
export const Navigation = () => {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">{"| "}About</Link>
        <Link href="/contact">{"| "}Contact</Link>
        <Link
          href="/post
        "
        >
          {"| "}Posts
        </Link>
        <Link href="/employees">{"| "}Employees</Link>
      </nav>
    </div>
  );
};
