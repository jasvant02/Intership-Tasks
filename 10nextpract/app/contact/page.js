import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <h1>Contact Page</h1>
      <Link href="/contact/company">
        <button>go to cmpany page</button>{" "}
      </Link>
    </div>
  );
}
