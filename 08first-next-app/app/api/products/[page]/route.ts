// app/api/products/[page]/route.ts

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { page: string } }
) {
  const page = parseInt(params.page, 10);

  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
  }

  const skip = (page - 1) * 10;

  const res = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${skip}&select=title,price`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
